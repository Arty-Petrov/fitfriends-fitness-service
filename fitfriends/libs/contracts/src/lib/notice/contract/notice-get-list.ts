import { NoticeListQuery } from '../query/notice-list.query';
import { NoticeListRdo } from '../rdo/notice-list.rdo';

export namespace NoticeGetList {
  export const topic = 'notice.get-list.query';

  export const queue = 'notice.get-list';

  export class Request extends NoticeListQuery { }

  export class Response extends  NoticeListRdo { }
}
