import { Entity, Subscriber } from '@fitfriends/shared-types';

export class SubscriberEntity implements Entity<SubscriberEntity>, Subscriber {
  public id: string;
  public publisherId: string;
  public publisherEmail: string;
  public publisherName: string;
  public subscriberId: string;
  public subscriberEmail: string;
  public subscriberName: string;

  constructor(subscriber: Subscriber) {
    this.fillEntity(subscriber);
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }

  public fillEntity(entity: Subscriber) {
    this.id = entity?.id;
    this.publisherId = entity.publisherId;
    this.publisherEmail = entity.publisherEmail;
    this.publisherName = entity.publisherName;
    this.subscriberId = entity.subscriberId;
    this.subscriberEmail = entity.subscriberEmail;
    this.subscriberName = entity.subscriberName;
  }
}
