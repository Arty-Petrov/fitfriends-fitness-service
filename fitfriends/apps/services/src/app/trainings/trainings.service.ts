import {
  StorageDeleteFile,
  TrainingCreateDto,
  TrainingUpdateDataDto,
  TrainingUpdateImageDto,
  TrainingUpdateVideoDto,
} from '@fitfriends/contracts';
import { Training } from '@fitfriends/shared-types';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { TrainingsRepository } from './trainings.repository';
import { UploadField } from '@fitfriends/core';
import { RMQService } from 'nestjs-rmq';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingsRepository: TrainingsRepository,
    private readonly rmqService: RMQService
  ) { }

  public async create(
    dto: TrainingCreateDto
  ): Promise<Training> {
    const trainingEntity = new TrainingEntity(dto);
    return this.trainingsRepository.create(trainingEntity);
  }

  public async getById(
    id: number
  ): Promise<Training> {
    const existTraining = await this.trainingsRepository.findById(id);
    if (!existTraining) {
      throw new ItemNotFoundException('Training', id);
    }
    return existTraining;
  }

  public async update(
    dto: TrainingUpdateDataDto
  ): Promise<Training> {
    const { id } = dto;
    const existTraining = await this.getById(id);
    const trainingEntity = new TrainingEntity({ ...existTraining, ...dto });
    return this.trainingsRepository.update(id, trainingEntity);
  }

  public async updateFiles(
    dto: TrainingUpdateImageDto | TrainingUpdateVideoDto
  ): Promise<Training> {
    const { id } = dto;
    const fieldName = Object.values(UploadField)
      .find((field) => dto[field]);
    const existTraining = await this.getById(id);
    const filePath = existTraining[fieldName];
    await this.rmqService.notify<StorageDeleteFile.Request>(
      StorageDeleteFile.topic,
      { fileName: filePath }
    );
    return this.update({...existTraining, [fieldName]: dto[fieldName] });
  }
}
