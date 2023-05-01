import { TRAININGS_RATING_DECIMALS } from '@fitfriends/contracts';
import { precisionRound } from '@fitfriends/core';
import { CRUDRepository, Review, ReviewQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewsRepository
  implements CRUDRepository<ReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: ReviewEntity): Promise<Review> {
    return this.prisma.review.create({
      data: { ...entity },
    }) as unknown as Review;
  }

  public async createMany(entities: ReviewEntity[]): Promise<Review[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.review.create({ data: entity }))
    ) as unknown as Review[];
  }

  public async findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: { id },
    }) as unknown as Review;
  }

  public async find(query: ReviewQuery): Promise<Review[]> {
    const { page, count, sortCreation, trainingId } = query;
    return this.prisma.review.findMany({
      where: { trainingId: trainingId },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Review[];
  }

  public async getTrainingRating(itemId: number): Promise<number> {
    const rating = (await this.prisma.review.aggregate({
      where: { trainingId: itemId },
      _avg: { evaluation: true }
    }))._avg.evaluation;
    return precisionRound(rating, TRAININGS_RATING_DECIMALS);
  } 

  public async update(id: number, entity: ReviewEntity): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Review;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }
}
