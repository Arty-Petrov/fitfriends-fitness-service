import { PickType } from '@nestjs/swagger';
import { NotificationApi } from '../notification.api';

export class NotificationCardRdo extends PickType(NotificationApi, ['id', 'userId', 'text', 'createdAt']) {
  public id: string;
  public userId: string;
  public text: string;
  public createdAt: Date;
}
