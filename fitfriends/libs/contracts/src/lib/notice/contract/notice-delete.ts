import { NoticeDeleteDto } from '../dto/notice-delete.dto';

export namespace NoticeDelete {
  export const topic = 'notice.delete.query';

  export const queue = 'notice.delete';

  export class Request extends NoticeDeleteDto { }

  export class Response { }
}
