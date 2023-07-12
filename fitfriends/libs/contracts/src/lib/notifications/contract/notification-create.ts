import { NotificationCreateDto } from '../dto/notification-create.dto';
import { NotificationCardRdo } from '../rdo/notification-card.rdo';

export namespace NotificationCreate {
  export const topic = 'notification.create.command';

  export const queue = 'notification.create';

  export class Request extends NotificationCreateDto { }

  export class Response extends NotificationCardRdo { }
}
