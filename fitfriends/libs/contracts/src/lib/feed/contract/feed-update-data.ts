import { FeedUpdateDataDto } from '../dto/feed-update-data.dto';
import { FeedDiaryPeriodRdo } from '../rdo/feed-diary-period.rdo';

export namespace FeedUpdateData {
  export const topic = 'feed.update-data.command';

  export const queue = 'feed.update-data';

  export class Request extends FeedUpdateDataDto { }

  export class Response extends FeedDiaryPeriodRdo { }
}
