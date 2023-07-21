import { FeedCreateDto } from '../dto/feed-create.dto';
import { FeedDiaryPeriodRdo } from '../rdo/feed-diary-period.rdo';

export namespace FeedCreate{
  export const topic = 'feed.create.command';

  export const queue = 'feed.create';

  export class Request extends FeedCreateDto { }

  export class Response extends FeedDiaryPeriodRdo { }
}
