import { TrainingListQuery } from '@fitfriends/contracts';
import { CRUDRepository, Training } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrainingEntity } from './training.entity';

@Injectable()
export class TrainingsRepository
  implements CRUDRepository<TrainingEntity, number, Training>
{
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TrainingEntity): Promise<Training> {
    const entityData = item.toObject();
    return this.prisma.trainings.create({
      data: { ...entityData },
    }) as unknown as Training;
  }

  public async findById(id: number): Promise<Training | null> {
    return this.prisma.trainings.findFirst({
      where: { id },
    }) as unknown as Training;
  }

  public async find(dto: TrainingListQuery): Promise<Training[]> {
    const {
      page,
      count,
      sortCreation,
      priceMin,
      priceMax,
      caloriesMin,
      caloriesMax,
      types,
      durations,
    } = dto;
    const trainings = await this.prisma.trainings.findMany({
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
      orderBy: [
        { createdAt: sortCreation },
      ],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    });
    return trainings.map((training) => training as unknown as Training);
  }

  public async update(id: number, training: TrainingEntity): Promise<Training> {
    return this.prisma.trainings.update({
      where: { id },
      data: { ...training },
    }) as unknown as Training;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainings.delete({
      where: { id },
    });
  }
}
