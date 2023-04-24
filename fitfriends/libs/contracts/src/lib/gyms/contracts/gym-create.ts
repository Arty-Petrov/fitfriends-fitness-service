import { GymCreateDto } from '../dto/gym-create.dto';
import { GymRdo } from '../rdo/gym.rdo';

export namespace GymCreate {
  export const topic = 'gym.create.command';

  export const queue = 'gym.create';

  export class Request extends GymCreateDto { }

  export class Response extends GymRdo { }
}
