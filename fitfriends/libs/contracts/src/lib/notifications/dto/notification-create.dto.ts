import { PickType } from '@nestjs/swagger';
import { NotificationApi } from '../notification.api';

export class NotificationCreateDto extends PickType(NotificationApi, ['userId', 'text']) { }
