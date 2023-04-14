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
    return this.prisma.reviews.create({
      data: { ...entity },
    }) as unknown as Review;
  }

  public async createMany(entities: ReviewEntity[]): Promise<Review[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.reviews.create({ data: entity }))
    ) as unknown as Review[];
  }

  public async findById(id: number): Promise<Review | null> {
    return this.prisma.reviews.findFirst({
      where: { id },
    }) as unknown as Review;
  }

  public async find(query: ReviewQuery): Promise<Review[]> {
    const { page, count, sortCreation, trainingId } = query;
    return this.prisma.reviews.findMany({
      where: { trainingId: trainingId },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Review[];
  }

  public async update(id: number, entity: ReviewEntity): Promise<Review> {
    return this.prisma.reviews.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Review;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.reviews.delete({
      where: { id },
    });
  }
}
