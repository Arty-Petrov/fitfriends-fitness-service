import { GymListQuery } from '../query/gym-list.query';
import { GymRdo } from '../rdo/gym.rdo';

export namespace GymGetList {
  export const topic = 'gym.get-list.query';

  export class Request extends GymListQuery { }

  export class Response extends GymRdo { }
}
