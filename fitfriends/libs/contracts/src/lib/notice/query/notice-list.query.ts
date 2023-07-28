import { PickType } from '@nestjs/swagger';
import { NoticeApi } from '../notice.api';

export class NoticeListQuery extends PickType(NoticeApi, [
  'recipientId',
  'sort',
  'count',
]) {}
