import {
  GymCreate,
  GymCreateMany,
  GymGetFavoriteList,
  GymGetList,
  GymGetOne,
  GymToggleFavorite,
} from '@fitfriends/contracts';
import { ExistsGuard, fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, UseGuards } from '@nestjs/common';
import { GymsService } from './gyms.service';

@Controller()
export class GymsController {
  public constructor(private readonly gymsService: GymsService) { }

  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymCreate.topic,
    queue: GymCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(dto: GymCreate.Request): Promise<GymCreate.Response> {
    const gym = await this.gymsService.create(dto);
    return fillObject(GymCreate.Response, gym);
  }

  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymCreateMany.topic,
    queue: GymCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: GymCreateMany.Request
  ): Promise<GymCreateMany.Response> {
    const gyms = await this.gymsService.createMany(dtos);
    return fillObject(GymCreateMany.Response, gyms);
  }
  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymGetOne.topic,
    queue: GymGetOne.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getOne(query: GymGetOne.Request): Promise<GymGetOne.Response> {
    const gym = await this.gymsService.getById(query);
    return fillObject(GymGetOne.Response, gym);
  }

  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymGetList.topic,
    queue: GymGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    query: GymGetList.Request
  ): Promise<GymGetList.Response> {
    const gyms = await this.gymsService.getList(query);
    return fillObject(GymGetList.Response, gyms);
  }

  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymGetFavoriteList.topic,
    queue: GymGetFavoriteList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getFavoriteList(
    query: GymGetFavoriteList.Request
  ): Promise<GymGetFavoriteList.Response> {
    const gyms = await this.gymsService.getFavoriteList(query);
    return fillObject(GymGetFavoriteList.Response, gyms);
  }

  @RabbitRPC({
    exchange: Exchanges.gyms.name,
    routingKey: GymToggleFavorite.topic,
    queue: GymToggleFavorite.queue,
    errorHandler: rmqErrorCallback,
  })
  @UseGuards(ExistsGuard)
  public async toggleFavorite(
    dto: GymToggleFavorite.Request
  ): Promise<GymToggleFavorite.Response> {
    const gym = await this.gymsService.toggleFavorite(dto);
    return fillObject(GymToggleFavorite.Response, gym);
  }
}
