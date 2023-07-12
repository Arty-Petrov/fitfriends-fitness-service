import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCardRdo } from '../rdo/review-card.rdo';

export namespace ReviewCreate {
  export const topic = 'review.create.command';

  export const queue = 'review.create';

  export class Request extends ReviewCreateDto { }

  export class Response extends ReviewCardRdo { }
}
