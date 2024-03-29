import { TrainingMyListQuery } from '../query/training-my-list.query';
import { TrainingListRdo } from '../rdo/training-list.rdo';

export namespace TrainingGetMyList {
  export const topic = 'training.get-my-list.query';

  export const queue = 'training.get-my-list';

  export class Request extends TrainingMyListQuery { }

  export class Response extends TrainingListRdo { }
}
