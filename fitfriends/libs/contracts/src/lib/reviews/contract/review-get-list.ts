import { ReviewListQuery } from '../query/review-list.query';
import { ReviewListRdo } from '../rdo/review-list.rdo';

export namespace ReviewGetList {
  export const topic = 'review.get-list.query';

  export const queue = 'review.get-list';

  export class Request extends ReviewListQuery { }

  export class Response extends ReviewListRdo { }
}
