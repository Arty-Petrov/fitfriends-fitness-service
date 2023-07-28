import { PickType } from '@nestjs/swagger';
import { SenderApi } from '../sender.api';

export class SenderSendSubscriptionDto extends PickType(SenderApi, [
  'publisherName',
  'subscriberName',
  'subscriberEmail',
]) { }
