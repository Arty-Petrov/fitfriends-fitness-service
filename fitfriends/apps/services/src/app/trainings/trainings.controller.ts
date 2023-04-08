import { TrainingCreate, TrainingGetOne, TrainingUpdateData, TrainingUpdateDataDto } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TrainingsService } from './trainings.service';

@Controller()
export class TrainingsController {
  public constructor(private readonly trainingsService: TrainingsService) { }

  @RMQValidate()
  @RMQRoute(TrainingCreate.topic)
  public async create(
    dto: TrainingCreate.Request
  ): Promise<TrainingCreate.Response> {
    const training = await this.trainingsService.create(dto);
    return fillObject(TrainingCreate.Response, training);
  }

  @RMQValidate()
  @RMQRoute(TrainingGetOne.topic)
  public async getOne(
    { id }: TrainingGetOne.Request
  ): Promise<TrainingGetOne.Response> {
    const training = await this.trainingsService.getById(id);
    return fillObject(TrainingGetOne.Response, training);
  }

  @RMQValidate()
  @RMQRoute(TrainingUpdateData.topic)
  public async updateData(
    dto: TrainingUpdateData.Request
  ): Promise<TrainingUpdateData.Response> {
    const training = await this.trainingsService.updateData(dto);
    return fillObject(TrainingUpdateData.Response, training);
  }
}
