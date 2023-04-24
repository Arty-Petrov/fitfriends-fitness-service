import {
  TrainingCreate,
  TrainingCreateMany,
  TrainingGetList,
  TrainingGetMyList,
  TrainingGetOne,
  TrainingUpdateData,
  TrainingUpdateImage,
  TrainingUpdateVideo,
} from '@fitfriends/contracts';
import { fillObject, OwnerGuard } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller()
export class TrainingsController {
  public constructor(private readonly trainingsService: TrainingsService) { }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingCreate.topic,
    queue: TrainingCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(
    dto: TrainingCreate.Request
  ): Promise<TrainingCreate.Response> {
    const training = await this.trainingsService.create(dto);
    return fillObject(TrainingCreate.Response, training);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingCreateMany.topic,
    queue: TrainingCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: TrainingCreateMany.Request
  ): Promise<TrainingCreateMany.Response> {
    const trainings = await this.trainingsService.createMany(dtos);
    return fillObject(TrainingCreateMany.Response, trainings);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingGetOne.topic,
    queue: TrainingGetOne.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getOne({
    id,
  }: TrainingGetOne.Request): Promise<TrainingGetOne.Response> {
    const training = await this.trainingsService.getById(id);
    return fillObject(TrainingGetOne.Response, training);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingGetList.topic,
    queue: TrainingGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    dto: TrainingGetList.Request
  ): Promise<TrainingGetList.Response> {
    const trainings = await this.trainingsService.getList(dto);
    return fillObject(TrainingGetList.Response, trainings);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingGetMyList.topic,
    queue: TrainingGetMyList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getMyList(
    dto: TrainingGetMyList.Request
  ): Promise<TrainingGetMyList.Response> {
    const trainings = await this.trainingsService.getList(dto);
    return fillObject(TrainingGetMyList.Response, trainings);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingUpdateData.topic,
    queue: TrainingUpdateData.queue,
    errorHandler: rmqErrorCallback,
  })
  @UseGuards(OwnerGuard)
  public async updateData(
    dto: TrainingUpdateData.Request
  ): Promise<TrainingUpdateData.Response> {
    const training = await this.trainingsService.update(dto);
    return fillObject(TrainingUpdateData.Response, training);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingUpdateImage.topic,
    queue: TrainingUpdateImage.queue,
    errorHandler: rmqErrorCallback,
  })
  public async updateImage(
    dto: TrainingUpdateImage.Request
  ): Promise<TrainingUpdateImage.Response> {
    const training = await this.trainingsService.updateFiles(dto);
    return fillObject(TrainingUpdateImage.Response, training);
  }

  @RabbitRPC({
    exchange: Exchanges.trainings.name,
    routingKey: TrainingUpdateVideo.topic,
    queue: TrainingUpdateVideo.queue,
    errorHandler: rmqErrorCallback,
  })
  public async updateVideo(
    dto: TrainingUpdateVideo.Request
  ): Promise<TrainingUpdateVideo.Response> {
    const training = await this.trainingsService.updateFiles(dto);
    return fillObject(TrainingUpdateVideo.Response, training);
  }
}
