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
import { fillObject } from '@fitfriends/core';
import { UserNotAuthorizedException } from '@fitfriends/exceptions';
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
  @RMQRoute(TrainingCreateMany.topic)
  public async createMany(
    dtos: TrainingCreateMany.Request
  ): Promise<TrainingCreateMany.Response> {
    const trainings = await this.trainingsService.createMany(dtos);
    return fillObject(TrainingCreateMany.Response, trainings);
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
  @RMQRoute(TrainingGetList.topic)
  public async getList(
    dto: TrainingGetList.Request
  ): Promise<TrainingGetList.Response> {
    const trainings = await this.trainingsService.getList(dto);
    return fillObject(TrainingGetList.Response, trainings);
  }

  @RMQValidate()
  @RMQRoute(TrainingGetMyList.topic)
  public async getMyList(
    dto: TrainingGetMyList.Request
  ): Promise<TrainingGetMyList.Response> {
    const trainings = await this.trainingsService.getList(dto);
    return fillObject(TrainingGetMyList.Response, trainings);
  }

  @RMQValidate()
  @RMQRoute(TrainingUpdateData.topic)
  public async updateData(
    dto: TrainingUpdateData.Request
  ): Promise<TrainingUpdateData.Response> {
    const {authorId, id} = dto;
    const isOwner = await this.trainingsService.isOwner(authorId, id);
    if (!isOwner) {
      throw new UserNotAuthorizedException(id);
    }
    const training = await this.trainingsService.update(dto);
    return fillObject(TrainingUpdateData.Response, training);
  }

  @RMQValidate()
  @RMQRoute(TrainingUpdateImage.topic)
  public async updateImage(
    dto: TrainingUpdateImage.Request
  ): Promise<TrainingUpdateImage.Response> {
    const {authorId, id} = dto;
    const isOwner = await this.trainingsService.isOwner(authorId, id);
    if (!isOwner) {
      throw new UserNotAuthorizedException(id);
    }
    const training = await this.trainingsService.updateFiles(dto);
    return fillObject(TrainingUpdateImage.Response, training);
  }

  @RMQValidate()
  @RMQRoute(TrainingUpdateVideo.topic)
  public async updateVideo(
    dto: TrainingUpdateVideo.Request
  ): Promise<TrainingUpdateVideo.Response> {
    const {authorId, id} = dto;
    const isOwner = await this.trainingsService.isOwner(authorId, id);
    if (!isOwner) {
      throw new UserNotAuthorizedException(id);
    }
    const training = await this.trainingsService.updateFiles(dto);
    return fillObject(TrainingUpdateVideo.Response, training);
  }
}
