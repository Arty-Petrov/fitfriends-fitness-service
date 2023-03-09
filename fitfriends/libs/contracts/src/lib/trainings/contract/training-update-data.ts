import { TrainingUpdateDto } from '../dto/training-update-data.dto';
import { TrainingCardRdo } from '../rdo/training-card.rdo';

export namespace TrainingGetOne {
  export const topic = 'training.update-data.command';

  export class Request extends TrainingUpdateDto { }

  export class Response extends TrainingCardRdo { }
}
