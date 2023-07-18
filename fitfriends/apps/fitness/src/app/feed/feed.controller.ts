import { FeedCreate, FeedCreateMany, FeedGetBalance, FeedGetDiary, FeedUpdateData } from '@fitfriends/contracts';
import { fillObject, OwnerGuard } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, UseGuards } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller()
export class FeedController {
  public constructor(private readonly feedService: FeedService) { }

  @RabbitRPC({
    exchange: Exchanges.feed.name,
    routingKey: FeedCreate.topic,
    queue: FeedCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(
    dto: FeedCreate.Request
  ): Promise<FeedCreate.Response> {
    const feedDiary = await this.feedService.create(dto);
    return fillObject(FeedCreate.Response, feedDiary);
  }

  @RabbitRPC({
    exchange: Exchanges.feed.name,
    routingKey: FeedCreateMany.topic,
    queue: FeedCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: FeedCreateMany.Request
  ): Promise<void> {
    await this.feedService.createMany(dtos);
  }

  @RabbitRPC({
    exchange: Exchanges.feed.name,
    routingKey: FeedGetBalance.topic,
    queue: FeedGetBalance.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getFeedBalance(
    query: FeedGetBalance.Request
  ): Promise<FeedGetBalance.Response> {
    const feedBalance = await this.feedService.getFeedBalance(query);
    return fillObject(FeedGetBalance.Response, feedBalance);
  }

  @RabbitRPC({
    exchange: Exchanges.feed.name,
    routingKey: FeedGetDiary.topic,
    queue: FeedGetDiary.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getFeedDiary(
    query: FeedGetDiary.Request
  ): Promise<FeedGetDiary.Response> {
    const feedDiary = await this.feedService.getFeedDiary(query);
    return fillObject(FeedGetDiary.Response, feedDiary);
  }

  @RabbitRPC({
    exchange: Exchanges.feed.name,
    routingKey: FeedUpdateData.topic,
    queue: FeedUpdateData.queue,
    errorHandler: rmqErrorCallback,
  })
  @UseGuards(OwnerGuard)
  public async updateData(
    dto: FeedUpdateData.Request
  ): Promise<FeedUpdateData.Response> {
    const feedDiary = await this.feedService.update(dto);
    return fillObject(FeedUpdateData.Response, feedDiary);
  }
}
