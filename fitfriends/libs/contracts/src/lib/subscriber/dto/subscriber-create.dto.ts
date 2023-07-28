import { PickType } from '@nestjs/swagger';
import { SubscriberApi } from '../subscriber.api';

export class SubscriberCreateDto extends PickType(SubscriberApi, [
  'publisherId',
  'publisherEmail',
  'publisherName',
  'subscriberId',
  'subscriberEmail',
  'subscriberName',
]) {}
