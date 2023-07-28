import { PublicationCreate, PublicationDeleteSent, PublicationGetList, PublicationRdo } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PublicationService } from './publication.service';

@Controller()
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}
  @RabbitRPC({
    exchange: Exchanges.publication.name,
    routingKey: PublicationCreate.topic,
    queue: PublicationCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(dto: PublicationCreate.Request): Promise<void> {
    await this.publicationService.create(dto);
  }

  @RabbitRPC({
    exchange: Exchanges.publication.name,
    routingKey: PublicationGetList.topic,
    queue: PublicationGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getListToSend(
    query: PublicationGetList.Request
  ): Promise<PublicationGetList.Response> {
    const publications = await this.publicationService.getListToSend(query);
    return fillObject(PublicationRdo, publications);
  }

  @RabbitRPC({
    exchange: Exchanges.publication.name,
    routingKey: PublicationDeleteSent.topic,
    queue: PublicationDeleteSent.queue,
    errorHandler: rmqErrorCallback,
  })
  public async deleteSent(dtos: PublicationDeleteSent.Request): Promise<void> {
    await this.publicationService.deleteSent(dtos);
  }
}
