import { PickType } from '@nestjs/swagger';
import { SubscriberApi } from '../subscriber.api';

export class SubscriberDeleteDto extends PickType(SubscriberApi, [
  'publisherId',
  'subscriberId',
]) {}
