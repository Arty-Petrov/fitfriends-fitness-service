import { PickType } from '@nestjs/swagger';
import { SenderApi } from '../sender.api';

export class SenderSendNewTrainingDto extends PickType(SenderApi, [
  'publisherId',
  'publisherName',
]) { }
