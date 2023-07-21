import {
  OrderCoachListQuery,
  OrderCoachListRdo,
  OrderCustomerListQuery,
  OrderCustomerListRdo,
  OrderDiaryQuery,
} from '@fitfriends/contracts';
import {
  CRUDRepository,
  DiaryDay,
  Order,
  OrderSortType,
  OrderStatus,
  ProductType,
  SortOrder,
} from '@fitfriends/shared-types';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import isoWeek from 'dayjs/plugin/isoWeek';
import { ORDER_EXPIRATION_PERIOD } from '../app.constant';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';

dayjs.extend(duration);
dayjs.extend(isoWeek);
dayjs.locale('ru')

@Injectable()
export class OrdersRepository
  implements CRUDRepository<OrderEntity, number, Order>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(_entity: OrderEntity): Promise<Order> {
    throw new RpcException(new NotImplementedException(_entity))
  }

  public async createMany(entities: OrderEntity[]): Promise<Order[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.order.create({
        data: {
          ...entity,
          [`${entity.productType}Id`]: entity.productId,
        },
      }))
    ) as unknown as Order[];
  }

  public async findById(id: number): Promise<Order | null> {
    return this.prisma.order.findFirst({
      where: { id },
    }) as unknown as Order;
  }

  public async findCustomerOrders(query: OrderCustomerListQuery): Promise<OrderCustomerListRdo[]> {
    const { page, count, sortCreation, type, isActive, customerId } = query;
    const productCreation =
      (sortCreation === SortOrder.Descended)
        ? Prisma.sql`"OR"."createdAt" DESC`
        : Prisma.sql`"OR"."createdAt" ASC`;
    let orderByType: unknown;
    if (type !== undefined){
      orderByType = (type === ProductType.Training)
        ? Prisma.sql`"OR"."productType" DESC,`
        : Prisma.sql`"OR"."productType" ASC,`;
    } else {
      orderByType = Prisma.sql``;
    }
    const whereOrderStatus = (isActive)
          ? Prisma.sql`AND "OR"."status" = ${OrderStatus.Purchased} AND "OR"."amount" > 0`
          : Prisma.sql``;
    const selectOrderStatus = (isActive)
          ? Prisma.sql`"OR"."status",`
          : Prisma.sql``;
    const offset = (page > 0) ? count * (page - 1) : 0;
    const customerOrders = await this.prisma.$queryRaw`
         SELECT * FROM (
          SELECT
            "TR"."id",
            ${ProductType.Training} AS "productType",
            "TR"."title",
            "TR"."description",
            "TR"."price",
            "TR"."image",
            "TR"."type",
            "TR"."rating",
            "TR"."caloriesLoss",
            null AS "location",
            null AS "isVerified",
            null AS "isFavorite"
          FROM "public"."Training" "TR"
        UNION
          SELECT
            "GM"."id",
            ${ProductType.Gym} AS "productType",
            "GM"."title",
            "GM"."description",
            "GM"."price",
            "GM"."photos"[1] AS "image",
            null AS "type",
            null AS "rating",
            null AS "caloriesLoss",
            "GM"."location",
            "GM"."isVerified",
              CASE
                WHEN "FG"."A" <> null THEN true
                WHEN "FG"."A" = ${customerId} THEN true
                ELSE false
              END
            "isFavorite"
          FROM "public"."Gym" "GM"
          LEFT JOIN (
            SELECT *
          FROM "public"."_FavoriteGymToGym" "FG"
          ) "FG" ON "FG"."B" = "GM"."id" AND "FG"."A" = ${customerId}
      ) "PR"
      JOIN (
        SELECT
        "OR"."productId",
        "OR"."productType",
        "OR"."authorId",
        ${selectOrderStatus}
        MAX("OR"."createdAt") AS "createdAt",
        COUNT ("OR"."productId") FILTER (WHERE "OR"."status" = ${OrderStatus.Purchased})::INTEGER as "amount"
        FROM "public"."Order" "OR"
        GROUP BY
        "OR"."productId",
        "OR"."productType",
        ${selectOrderStatus}
        "OR"."authorId"
      ) "OR" ON
        "PR"."id" = "OR"."productId" AND
        "PR"."productType" = "OR"."productType"
      WHERE
        "OR"."authorId" = ${customerId}
        ${whereOrderStatus}
      ORDER BY ${orderByType} ${productCreation}
      LIMIT ${count}
      OFFSET ${offset}
    `;
    return  customerOrders as unknown as OrderCustomerListRdo[];
  }

  public async findCoachOrders(query: OrderCoachListQuery): Promise<OrderCoachListRdo[]> {
    const { page, count, sortCreation, sortType, sortOrder, coachId } = query;
    const productCreation =
      sortCreation === SortOrder.Descended
        ? Prisma.sql`"TR"."createdAt" DESC`
        : Prisma.sql`"TR"."createdAt" ASC`;
    let orderByType;
    if (sortType === OrderSortType.Amount) {
      orderByType =
        (sortOrder === SortOrder.Descended)
          ? Prisma.sql`"OR"."amount" DESC,`
          : Prisma.sql`"OR"."amount" ASC,`;
    } else {
      orderByType =
        (sortOrder === SortOrder.Descended)
          ? Prisma.sql`"OR"."totalPrice" DESC,`
          : Prisma.sql`"OR"."totalPrice" ASC,`;
    }
    const offset = (page > 0) ? count * (page - 1) : 0;
    const coachOrders = await this.prisma.$queryRaw`
      SELECT *
        FROM "public"."Training" "TR"
      JOIN (
        SELECT
        SUM("OR"."productPrice")::INTEGER AS "totalPrice",
        COUNT("OR"."id")::INTEGER AS "amount",
        "OR"."trainingId"
        FROM "public"."Order" "OR"
        GROUP BY "OR"."trainingId"
      ) "OR" ON "TR"."id" = "OR"."trainingId"
      WHERE "TR"."authorId" = ${coachId}
      ORDER BY ${orderByType} ${productCreation}
      LIMIT ${count}
      OFFSET ${offset}
    `;
    return coachOrders as unknown as OrderCoachListRdo[];
  }

  public async getOrderStatus(
    productId: number,
    productType: ProductType,
    userId: string
  ): Promise<Pick<Order, 'id' | 'status'> | null> {
    const selectStatuses = [
      OrderStatus.Purchased,
      OrderStatus.Started
    ];
    const productStatuses = await this.prisma.order.groupBy({
       by: ['status'],
        where: {
          productId: productId,
          productType: productType,
          authorId: userId,
          status: { in: selectStatuses }
      },
      _min: { id: true },
    });
    const statuses = new Map;
    if (productStatuses.length) {
      productStatuses.forEach(
        (item) =>
          statuses.set(
            item.status,
            {id: item._min.id,
            status: item.status as OrderStatus}
          ))
    }
    switch (statuses.size) {
      case 0 :
      return null;
      case 1 :
      return statuses.values().next().value;
      case 2 :
      return (statuses.has(OrderStatus.Started))
          ? statuses.get(OrderStatus.Started)
          : statuses.get(OrderStatus.Purchased);
    }
  }

  public async getDiaryDays(query: OrderDiaryQuery): Promise<DiaryDay[]> {
    const { customerId } = query;
    const firstDayOfWeek = new Date(dayjs().isoWeekday(0).format('YYYY-MM-DD'));
    const lastDayOfWeek = new Date(dayjs().isoWeekday(6).format('YYYY-MM-DD'));
    const status = OrderStatus.Finished;
    const productType = ProductType.Training;
    return this.prisma.$queryRaw<DiaryDay[]>(Prisma.sql`
      WITH all_dates AS (
          SELECT (DATE_TRUNC('week', NOW()) + (n || ' day')::interval)::date AS "date"
          FROM generate_series(0, 6) AS n
      )
      SELECT
      TO_CHAR(ad."date", 'YYYY-MM-DD') AS "date",
          COALESCE(json_agg(
            json_build_object(
              'ordinal', main.row_number,
              'duration', main.duration,
              'caloriesLoss', main."caloriesLoss"
            )
          ) FILTER (WHERE main.row_number IS NOT NULL), '[]') AS dayData,
          COALESCE(SUM(main."caloriesLoss")::INTEGER, 0) AS "dayCaloriesLoss"
      FROM
        all_dates AS ad
      LEFT JOIN (
        SELECT
          DATE_TRUNC('day', o."updatedAt") AS "date",
          ROW_NUMBER() OVER (PARTITION BY DATE_TRUNC('day', o."updatedAt") ORDER BY o."updatedAt") AS row_number,
          t.duration,
          t."caloriesLoss"
        FROM
          "Order" AS o
        LEFT JOIN "Training" AS t ON o."trainingId" = t.id
      WHERE
        o."authorId" = ${customerId}
        AND o."status" = ${status}
        AND o."productType" = ${productType}
        AND o."updatedAt" >= ${firstDayOfWeek}
        AND o."updatedAt" <= ${lastDayOfWeek}
      ) AS main ON ad."date" = main."date"
        GROUP BY
      ad."date"
        ORDER BY
        ad."date"
    `);
  }

  public async update(id: number, entity: OrderEntity): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Order;
  }

  public async markExpiredOrders(customerId: string): Promise<void> {
    await this.prisma.order.updateMany({
      where: {
        authorId: customerId,
        status: OrderStatus.Started,
        updatedAt: { lte: dayjs().subtract(dayjs.duration(ORDER_EXPIRATION_PERIOD)).toDate() },
      },
      data: { status: OrderStatus.Expired },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
