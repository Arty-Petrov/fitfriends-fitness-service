import { GymFavoriteDto } from '../dto/gym-favorite.dto';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymToggleFavorite {
  export const topic = 'gym.toggle-favorite.command';

  export const queue = 'gym.toggle-favorite';

  export class Request extends GymFavoriteDto { }

  export class Response extends GymCardRdo { }
}
