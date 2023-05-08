import {
  OrderCoachListQuery,
  OrderCoachListRdo,
  OrderCustomerListQuery,
  OrderCustomerListRdo,
} from '@fitfriends/contracts';
import { CRUDRepository, Order, OrderSortType, OrderStatus, ProductType, SortOrder } from '@fitfriends/shared-types';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersRepository
  implements CRUDRepository<OrderEntity, number, Order>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: OrderEntity): Promise<Order> {
    throw new RpcException(new NotImplementedException())
  }
A
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
        COUNT ("OR"."productId") filter (WHERE "OR"."status" = ${OrderStatus.Purchased})::INTEGER as "amount"
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
    let orderByType = Prisma.sql``;
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

  public async update(id: number, entity: OrderEntity): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Order;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.order.delete({
      where: { id },
    });
  }
}
