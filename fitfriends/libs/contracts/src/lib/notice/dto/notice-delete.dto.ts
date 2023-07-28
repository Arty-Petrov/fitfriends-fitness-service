import { PickType } from '@nestjs/swagger';
import { NoticeApi } from '../notice.api';

export class NoticeDeleteDto extends PickType(NoticeApi, ['id', 'recipientId']) { }
