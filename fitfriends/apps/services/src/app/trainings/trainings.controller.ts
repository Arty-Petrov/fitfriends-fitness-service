import { TrainingCreate } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { TrainingsService } from './trainings.service';

@Controller()
export class TrainingsController {
public constructor(private readonly trainingsService: TrainingsService) { }

  @RMQValidate()
  @RMQRoute(TrainingCreate.topic)
  async create(dto: TrainingCreate.Request): Promise<TrainingCreate.Response> {
    const training = await this.trainingsService.create(dto);
    return fillObject(TrainingCreate.Response, training);
  }
}
