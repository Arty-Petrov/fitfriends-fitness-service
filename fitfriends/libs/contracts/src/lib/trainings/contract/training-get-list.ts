import { TrainingListQuery } from '../query/training-list.query';
import { TrainingListRdo } from '../rdo/training-list.rdo';

export namespace TrainingGetList {
  export const topic = 'training.get-list.query';

  export class Request extends TrainingListQuery { }

  export class Response extends TrainingListRdo { }
}
