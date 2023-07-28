import { SenderSendNewTraining, SenderSendSubscription, SenderSendUnsubscription } from '@fitfriends/contracts';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { SenderMailService } from './sender-mail.service';

@Controller()
export class SenderController {
  constructor(private readonly senderMailService: SenderMailService) {}
  @RabbitRPC({
    exchange: Exchanges.sender.name,
    routingKey: SenderSendSubscription.topic,
    queue: SenderSendSubscription.queue,
    errorHandler: rmqErrorCallback,
  })
  public async sendSubscription(
    dto: SenderSendSubscription.Request
  ): Promise<SenderSendSubscription.Response> {
    return this.senderMailService.sendSubscription(dto);
  }

  @RabbitRPC({
    exchange: Exchanges.sender.name,
    routingKey: SenderSendUnsubscription.topic,
    queue: SenderSendUnsubscription.queue,
    errorHandler: rmqErrorCallback,
  })
  public async sendUnsubscription(
    dto: SenderSendUnsubscription.Request
  ): Promise<SenderSendUnsubscription.Response> {
    return this.senderMailService.sendUnsubscription(dto);
  }

  @RabbitRPC({
    exchange: Exchanges.sender.name,
    routingKey: SenderSendNewTraining.topic,
    queue: SenderSendNewTraining.queue,
    errorHandler: rmqErrorCallback,
  })
  public async sendNewTraining(
    dto: SenderSendNewTraining.Request
  ): Promise<SenderSendNewTraining.Response> {
    return this.senderMailService.sendNewTraining(dto);
  }
}
