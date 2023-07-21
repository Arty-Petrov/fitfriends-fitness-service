import { FeedDiaryQuery } from '../query/feed-diary.query';
import { FeedDiaryPeriodRdo } from '../rdo/feed-diary-period.rdo';

export namespace FeedGetDiary {
  export const topic = 'feed.get-diary.query';

  export const queue = 'feed.get-diary';

  export class Request extends FeedDiaryQuery { }

  export class Response extends FeedDiaryPeriodRdo { }
}
