import { SubscriberCreateDto, SubscriberDeleteDto } from '@fitfriends/contracts';
import { ItemExistsException, ItemNotExistsException } from '@fitfriends/exceptions';
import { Subscriber } from '@fitfriends/shared-types';
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SenderMailService } from '../sender/sender-mail.service';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberRepository } from './subscriber.repository';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    @Inject(forwardRef(() => SenderMailService))
    private readonly senderMailService: SenderMailService
  ) {}

  public async create(dto: SubscriberCreateDto): Promise<HttpStatus> {
    const { subscriberId, publisherId } = dto;
    const existsSubscriber = await this.subscriberRepository.findExist(
      publisherId,
      subscriberId
    );
    if (existsSubscriber) {
      throw new ItemExistsException('Subscriber', dto);
    }
    const subscriberEntity = new SubscriberEntity({ ...dto });
    const subscriber = await this.subscriberRepository.create(subscriberEntity);
    const { publisherName, subscriberName, subscriberEmail } = subscriber;
    await this.senderMailService.sendSubscription({
      publisherName,
      subscriberName,
      subscriberEmail,
    });
    return HttpStatus.OK;
  }

  public async getSubscribers(publisherId: string): Promise<Subscriber[]> {
    return this.subscriberRepository.findByPublisherId(publisherId);
  }

  public async delete(dto: SubscriberDeleteDto): Promise<HttpStatus> {
    const { publisherId, subscriberId } = dto;
    const existsSubscriber = await this.subscriberRepository.findExist(
      publisherId,
      subscriberId
    );
    if (!existsSubscriber) {
      throw new ItemNotExistsException('Subscriber', subscriberId);
    }
    await this.subscriberRepository.destroy(existsSubscriber.id);
    const { publisherName, subscriberName, subscriberEmail } = existsSubscriber;
    await this.senderMailService.sendUnsubscription({
      publisherName,
      subscriberName,
      subscriberEmail,
    });
    return HttpStatus.OK;
  }
}
