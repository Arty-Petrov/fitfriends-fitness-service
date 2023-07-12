import { GymFavoriteListQuery } from '../query/gym-favorite-list.query';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymGetFavoriteList {
  export const topic = 'gym.get-favorite-list.query';

  export const queue = 'gym.get-favorite-list';

  export class Request extends GymFavoriteListQuery { }

  export class Response extends GymCardRdo { }
}
