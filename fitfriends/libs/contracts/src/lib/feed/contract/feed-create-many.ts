import { HttpStatus } from '@nestjs/common';
import { FeedCreateDto } from '../dto/feed-create.dto';

export namespace FeedCreateMany {
  export const topic = 'feed.create-many.command';

  export const queue = 'feed.create-many';

  export class Request extends Array<FeedCreateDto> { }

  export class Response {
    public statusCode: HttpStatus;
  }
}
