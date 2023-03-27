import { NotificationListQuery } from '../query/notification-list.query';
import { NotificationListRdo } from '../rdo/notification-list.rdo';

export namespace NotificationGetList {
  export const topic = 'notification.get-list.query';

  export class Request extends NotificationListQuery { }

  export class Response {
    public notifications: NotificationListRdo[];
  }
}
