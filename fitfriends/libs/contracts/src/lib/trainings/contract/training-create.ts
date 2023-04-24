import { TrainingCreateDto } from '../dto/training-create.dto';
import { TrainingCardRdo } from '../rdo/training-card.rdo';

export namespace TrainingCreate {
  export const topic = 'training.create.command';

  export const queue = 'training.create';

  export class Request extends TrainingCreateDto { }

  export class Response extends TrainingCardRdo { }
}
