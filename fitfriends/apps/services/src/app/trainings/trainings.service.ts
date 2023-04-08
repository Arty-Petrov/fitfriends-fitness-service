import { TrainingCreateDto, TrainingUpdateDataDto } from '@fitfriends/contracts';
import { Training } from '@fitfriends/shared-types';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { TrainingsRepository } from './trainings.repository';

@Injectable()
@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingsRepository: TrainingsRepository,
  ) { }

  public async create(dto: TrainingCreateDto): Promise<Training> {
    const trainingEntity = new TrainingEntity(dto);
    return this.trainingsRepository.create(trainingEntity);
  }

  public async getById(id: number): Promise<Training> {
    const existTraining = await this.trainingsRepository.findById(id);
    if (!existTraining) {
      throw new ItemNotFoundException('Training', id);
    }
    return existTraining;
  }

  public async updateData(dto: TrainingUpdateDataDto): Promise<Training> {
    const { id } = dto; 
    const existTraining = await this.getById(id);
    const trainingEntity = new TrainingEntity({ ...existTraining, ...dto });
    return this.trainingsRepository.update(id, trainingEntity);
  }
}
