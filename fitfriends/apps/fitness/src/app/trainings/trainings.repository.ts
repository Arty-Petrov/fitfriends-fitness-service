import { CRUDRepository, Training, TrainingQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingsRepository
  implements CRUDRepository<TrainingEntity, number, Training>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: TrainingEntity): Promise<Training> {
    return this.prisma.trainings.create({
      data: { ...entity},
    }) as unknown as Training;
  }

  public async createMany(entities: TrainingEntity[]): Promise<Training[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.trainings.create({ data: entity}))
    ) as unknown as Training[];
  }

  public async findById(id: number): Promise<Training | null> {
    return this.prisma.trainings.findFirst({
      where: { id },
    }) as unknown as Training;
  }

  public async find(query: TrainingQuery): Promise<Training[]> {
    const {
      page,
      count,
      sortCreation,
      sortPrice,
      priceMin,
      priceMax,
      caloriesMin,
      caloriesMax,
      types,
      durations,
    } = query;
    return this.prisma.trainings.findMany({
      where: {
        duration: { in: durations },
        type: { in: types },
        price: {
          lte: priceMax,
          gte: priceMin,
        },
        caloriesLoss: {
          lte: caloriesMax,
          gte: caloriesMin,
        },
      },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Training[];
  }

  public async update(id: number, entity: TrainingEntity): Promise<Training> {
    return this.prisma.trainings.update({
      where: { id },
      data: { ...entity },
    }) as unknown as Training;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainings.delete({
      where: { id },
    });
  }
}