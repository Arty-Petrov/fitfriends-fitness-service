import { TrainingCreateDto } from '../dto/training-create.dto';
import { TrainingCardRdo } from '../rdo/training-card.rdo';

export namespace TrainingCreateMany {
  export const topic = 'training.create-many.command';

  export const queue = 'training.create-many.command';

  export class Request extends Array<TrainingCreateDto> { }

  export class Response extends TrainingCardRdo { }
}
