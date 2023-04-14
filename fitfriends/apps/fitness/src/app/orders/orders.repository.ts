import { OrderCoachListRdo } from '@fitfriends/contracts';
import { CRUDRepository, Order, OrderQuery, OrderSortType, SortOrder } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';
import { Prisma } from '.prisma/fitfriends-fitness';

@Injectable()
export class OrdersRepository
  implements CRUDRepository<OrderEntity, number, Order>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: OrderEntity): Promise<Order> {
    return this.prisma.orders.create({
      data: { ...entity },
    }) as unknown as Order;
  }

  public async createMany(entities: OrderEntity[]): Promise<Order[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.orders.create({ data: entity }))
    ) as unknown as Order[];
  }

  public async findById(id: number): Promise<Order | null> {
    return this.prisma.orders.findFirst({
      where: { id },
    }) as unknown as Order;
  }

  public async findCoachOrders(query: OrderQuery): Promise<OrderCoachListRdo[]> {
    const { page, count, sortCreation, sortType, sortOrder, coachId } = query;
    const orderCreation =
      sortCreation === SortOrder.Descended
        ? Prisma.sql`"OR"."createdAt" DESC`
        : Prisma.sql`"OR"."createdAt" ASC`;
    let orderByType: unknown;
    if (sortType === OrderSortType.Quantity) {
      orderByType =
        (sortOrder === SortOrder.Descended)
          ? Prisma.sql`"OR"."quantity" DESC`
          : Prisma.sql`"OR"."quantity" ASC`;
    } else {
      orderByType =
        (sortOrder === SortOrder.Descended)
          ? Prisma.sql`"OR"."totalPrice" DESC`
          : Prisma.sql`"OR"."totalPrice" ASC`;
    }
    const offset = (page > 0) ? count * (page - 1) : 0;
    const resp = await this.prisma.$queryRaw`
      SELECT *
        FROM "public"."Orders" "OR"
      JOIN (
        SELECT
        "TR"."id" as "trainingId", "TR"."title", "TR"."description",
        "TR"."authorId" as "coachId", "TR"."image",
        "TR"."experience", "TR"."type", "TR"."duration",
        "TR"."caloriesLoss", "TR"."gender", "TR"."video",
        "TR"."isSpecialOffer",
        AVG("RW"."evaluation") as "rating"
        FROM "public"."Trainings" "TR"
        JOIN "public"."Reviews" "RW" ON "RW"."trainingId" = "TR"."id"
        WHERE "TR"."authorId" = ${coachId}
        GROUP BY "TR"."id"
      ) "T" ON "OR"."productId" = "T"."trainingId"
      ORDER BY ${orderCreation}, ${orderByType}
      LIMIT ${count}
      OFFSET ${offset}
      `;
    return resp as unknown as OrderCoachListRdo[];
  }

  public async find(query: OrderQuery): Promise<Order[]> {
    const { page, count, sortCreation, type } = query;
    return this.prisma.orders.findMany({
      where: {
        productType: type,
      },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Order[];
  }

  public async update(id: number, entity: OrderEntity): Promise<Order> {
    return this.prisma.orders.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Order;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.orders.delete({
      where: { id },
    });
  }
}
