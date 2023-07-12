import { TrainingUpdateDataDto } from '../dto/training-update-data.dto';
import { TrainingCardRdo } from '../rdo/training-card.rdo';

export namespace TrainingUpdateData {
  export const topic = 'training.update-data.command';

  export const queue = 'training.update-data';

  export class Request extends TrainingUpdateDataDto { }

  export class Response extends TrainingCardRdo { }
}
