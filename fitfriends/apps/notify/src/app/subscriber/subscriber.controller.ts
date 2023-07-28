import { SubscriberCreate, SubscriberDelete } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';

@Controller()
export class SubscriberController {
  constructor(
    private readonly subscriberService: SubscriberService,
  ) {}

  @RabbitRPC({
    exchange: Exchanges.subscriber.name,
    routingKey: SubscriberCreate.topic,
    queue: SubscriberCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(
    dto: SubscriberCreate.Request
  ): Promise<SubscriberCreate.Response> {
    const subscription = await this.subscriberService.create(dto);
    return fillObject (SubscriberCreate.Response, subscription);
  }

  @RabbitRPC({
    exchange: Exchanges.subscriber.name,
    routingKey: SubscriberDelete.topic,
    queue: SubscriberDelete.queue,
    errorHandler: rmqErrorCallback,
  })
  public async delete(
    dto: SubscriberDelete.Request
  ): Promise<SubscriberDelete.Response> {
    const subscription = await this.subscriberService.delete(dto);
    return fillObject (SubscriberDelete.Response, subscription);
  }
}
