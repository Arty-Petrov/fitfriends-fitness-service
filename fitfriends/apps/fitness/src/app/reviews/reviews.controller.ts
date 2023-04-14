import { ReviewCreate, ReviewCreateMany, ReviewGetList } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  public constructor(private readonly reviewsService: ReviewsService) { }

  @RMQValidate()
  @RMQRoute(ReviewCreate.topic)
  public async create(
    dto: ReviewCreate.Request
  ): Promise<ReviewCreate.Response> {
    const review = await this.reviewsService.create(dto);
    return fillObject(ReviewCreate.Response, review);
  }

  @RMQValidate()
  @RMQRoute(ReviewCreateMany.topic)
  public async createMany(
    dtos: ReviewCreateMany.Request
  ): Promise<ReviewCreateMany.Response> {
    const reviews = await this.reviewsService.createMany(dtos);
    return fillObject(ReviewCreateMany.Response, reviews);
  }

  @RMQValidate()
  @RMQRoute(ReviewGetList.topic)
  public async getList(
    dto: ReviewGetList.Request
  ): Promise<ReviewGetList.Response> {
    const reviews = await this.reviewsService.getList(dto);
    return fillObject(ReviewGetList.Response, reviews);
  }
}
