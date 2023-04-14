import { ReviewCreateDto } from '../dto/review-create.dto';
import { ReviewCardRdo } from '../rdo/review-card.rdo';

export namespace ReviewCreateMany {
  export const topic = 'review.create-many.command';

  export class Request extends Array<ReviewCreateDto> { }

  export class Response extends ReviewCardRdo { }
}
