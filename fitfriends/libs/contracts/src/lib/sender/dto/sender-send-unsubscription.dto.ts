import { PickType } from '@nestjs/swagger';
import { SenderApi } from '../sender.api';

export class SenderSendUnsubscriptionDto extends PickType(SenderApi, [
  'publisherName',
  'subscriberName',
  'subscriberEmail',
]) { }
