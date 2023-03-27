import { PickType } from '@nestjs/swagger';
import { NotificationApi } from '../notification.api';

export class NotificationListQuery extends PickType(NotificationApi, ['sort', 'page', 'count']) { }
