import { TrainingCreateDto } from '@fitfriends/contracts';
import { Training } from '@fitfriends/shared-types';
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

}
