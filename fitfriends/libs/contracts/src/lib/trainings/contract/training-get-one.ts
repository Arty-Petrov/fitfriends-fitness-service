import { PickType } from '@nestjs/swagger';
import { TrainingCardRdo } from '../rdo/training-card.rdo';
import { TrainingApi } from '../training.api';

export namespace TrainingGetOne {
  export const topic = 'training.get-one.query';

  export const queue = 'training.get-one';

  export class Request extends PickType(TrainingApi, ['id']) { }

  export class Response extends TrainingCardRdo { }
}
