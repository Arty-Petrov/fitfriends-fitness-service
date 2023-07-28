import { NoticeCreateDto } from '../dto/notice-create.dto';

export namespace NoticeCreate {
  export const topic = 'notice.create.command';

  export const queue = 'notice.create';

  export class Request extends NoticeCreateDto { }

  export class Response { }
}
