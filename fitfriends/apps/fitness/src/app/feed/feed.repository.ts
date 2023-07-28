import { FeedBalanceQuery, FeedDiaryQuery } from '@fitfriends/contracts';
import { CRUDRepository, Feed, FeedBalanceDay, FeedDiaryDay, OrderStatus, ProductType } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';
import { FeedEntity } from './feed.entity';

@Injectable()
export class FeedRepository
  implements CRUDRepository<FeedEntity, number, Feed> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: FeedEntity): Promise<Feed> {
    return this.prisma.feed.create({
      data: {
        ...entity,
      },
    }) as unknown as Feed;
  }

  public async createMany(entities: FeedEntity[]): Promise<Feed[]> {
    return await this.prisma.$transaction(
      entities.map((entity) => this.prisma.feed.create({data: entity}))
    ) as unknown as Feed[];
  }

  public async findById(id: number): Promise<Feed | null> {
    return this.prisma.feed.findFirst({
      where: { id },
    }) as unknown as Feed;
  }

  public async getFeedBalance(query: FeedBalanceQuery): Promise<FeedBalanceDay[]> {
    const { authorId } = query;
    const firstDayOfWeek = new Date(dayjs().isoWeekday(1).format('YYYY-MM-DD'));
    return this.prisma.$queryRaw<FeedBalanceDay[]>(Prisma.sql`
      WITH all_dates AS (
          SELECT (DATE_TRUNC('week', ${firstDayOfWeek}) + (n || ' day')::interval)::date AS "date"
          FROM generate_series(0, 6) AS n
        )
        SELECT
          TO_CHAR(ad."date", 'YYYY-MM-DD') AS "date",
          COALESCE(SUM(feed."caloriesGain")::INTEGER, 0) AS "dayCaloriesGain",
          COALESCE(SUM(training."caloriesLoss")::INTEGER, 0) AS "dayCaloriesLoss",
          COALESCE(SUM(feed."caloriesGain")::INTEGER, 0) - COALESCE(SUM(training."caloriesLoss")::INTEGER, 0) AS "dayCaloriesTotal"
        FROM
          all_dates AS ad
          LEFT JOIN "Feed" AS feed ON ad."date" = DATE_TRUNC('day', feed."date") AND feed."authorId" = ${authorId}
          LEFT JOIN "Order" AS o ON ad."date" = DATE_TRUNC('day', o."updatedAt") AND o."authorId" = ${authorId} AND o."status" = ${OrderStatus.Finished}
          LEFT JOIN "Training" AS training ON o."productId" = training."id" AND o."productType" = ${ProductType.Training}
        GROUP BY
          ad."date"
        ORDER BY
          ad."date"
    `);
  }

  public async getFeedDiary(query: FeedDiaryQuery): Promise<FeedDiaryDay[]> {
    const { authorId } = query;
    const firstDayOfWeek = new Date(dayjs().isoWeekday(1).format('YYYY-MM-DD'));
    const lastDayOfWeek = new Date(dayjs().isoWeekday(7).format('YYYY-MM-DD'));
    return this.prisma.$queryRaw<FeedDiaryDay[]>(Prisma.sql`
WITH all_dates AS (
    SELECT (DATE_TRUNC('week', ${firstDayOfWeek}) + (n || ' day')::interval)::date AS "date"
    FROM generate_series(0, 6) AS n
  )
  SELECT
    TO_CHAR(ad."date", 'YYYY-MM-DD') AS "date",
    COALESCE(json_agg(json_build_object('id', f.id, 'mealOrdinal', f."mealOrdinal",'caloriesGain', f."caloriesGain") ORDER BY f."mealOrdinal"), '[]') AS "dayData",
    COALESCE(SUM(f."caloriesGain")::INTEGER, 0) AS "dayCaloriesGain"
  FROM
    all_dates AS ad
    LEFT JOIN "Feed" AS f ON ad."date" = DATE(f.date)
  WHERE
    f."authorId" = ${authorId}
    AND f.date >= ${firstDayOfWeek}
    AND f.date <= ${lastDayOfWeek}
  GROUP BY
    ad."date"
  ORDER BY
    ad."date"
    `);
  }

  public async update(id: number, entity: FeedEntity): Promise<Feed> {
    return this.prisma.feed.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Feed;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.feed.delete({
      where: { id },
    });
  }

  public async checkExistEntry(date: Date, mealOrdinal: number, authorId: string): Promise<boolean> {
    const existEntry = await this.prisma.feed.findUnique({
      where: {
        dateMealOrdinalAuthor: {
          date: date,
          mealOrdinal: mealOrdinal,
          authorId: authorId,
        }
      }
    });
    return !!existEntry;
  }
}
