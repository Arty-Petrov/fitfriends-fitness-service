import { PickType } from '@nestjs/swagger';
import { NoticeApi } from '../notice.api';

export class NoticeCreateDto extends PickType(NoticeApi, [
  'senderId',
  'senderName',
  'senderGender',
  'recipientId',
  'category',
]) {}
