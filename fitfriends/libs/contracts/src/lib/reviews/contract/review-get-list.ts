import { PickType } from '@nestjs/swagger';
import { ReviewListRdo } from '../rdo/review-list.rdo';
import { ReviewApi } from '../review.api';

export namespace ReviewGetList {
  export const topic = 'review.get-list.query';

  export class Request extends PickType(ReviewApi, ['trainingId']) { }

  export class Response extends ReviewListRdo { }
}
