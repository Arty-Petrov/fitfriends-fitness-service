import { TrainingListQuery } from '../query/training-list.query';
import { TrainingListRdo } from '../rdo/training-list.rdo';

export namespace TrainingGetMyList {
  export const topic = 'training.get-my-list.query';

  export class Request extends TrainingListQuery { }

  export class Response {
    trainings: TrainingListRdo[];
  }
}
