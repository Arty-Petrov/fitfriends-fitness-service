import { GymQuery } from '../query/gym.query';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymGetOne {
  export const topic = 'gym.get-one.query';

  export const queue = 'gym.get-one';

  export class Request extends GymQuery { }

  export class Response extends GymCardRdo { }
}
