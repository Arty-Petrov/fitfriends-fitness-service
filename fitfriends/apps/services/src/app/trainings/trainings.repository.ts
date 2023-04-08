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

  update(id: number, item: TrainingEntity): Promise<Training> {
    throw new Error('Method not implemented.');
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainings.delete({
      where: {
        id,
      },
    });
  }
}
