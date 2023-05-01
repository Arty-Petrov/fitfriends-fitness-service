import { ReviewCreate, ReviewCreateMany, ReviewGetList } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  public constructor(private readonly reviewsService: ReviewsService) { }

  @RabbitRPC({
    exchange: Exchanges.reviews.name,
    routingKey: ReviewCreate.topic,
    queue: ReviewCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(
    dto: ReviewCreate.Request
  ): Promise<ReviewCreate.Response> {
    const review = await this.reviewsService.create(dto);
    return fillObject(ReviewCreate.Response, review);
  }

  @RabbitRPC({
    exchange: Exchanges.reviews.name,
    routingKey: ReviewCreateMany.topic,
    queue: ReviewCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: ReviewCreateMany.Request
  ): Promise<ReviewCreateMany.Response> {
    const reviews = await this.reviewsService.createMany(dtos);
    return fillObject(ReviewCreateMany.Response, reviews);
  }

  @RabbitRPC({
    exchange: Exchanges.reviews.name,
    routingKey: ReviewGetList.topic,
    queue: ReviewGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    query: ReviewGetList.Request
  ): Promise<ReviewGetList.Response> {
    const reviews = await this.reviewsService.getList(query);
    return fillObject(ReviewGetList.Response, reviews);
  }
}
