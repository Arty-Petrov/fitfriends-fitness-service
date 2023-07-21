import { FeedBalanceQuery } from '../query/feed-balance.query';
import { FeedBalanceDayRdo } from '../rdo/feed-balance-day.rdo';

export namespace FeedGetBalance {
  export const topic = 'feed.get-balance.query';

  export const queue = 'feed.get-balance';

  export class Request extends FeedBalanceQuery { }

  export class Response extends FeedBalanceDayRdo { }
}
