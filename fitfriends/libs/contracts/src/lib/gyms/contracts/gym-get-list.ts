import { GymListQuery } from '../query/gym-list.query';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymGetList {
  export const topic = 'gym.get-list.query';

  export const queue = 'gym.get-list';

  export class Request extends GymListQuery { }

  export class Response extends GymCardRdo { }
}
