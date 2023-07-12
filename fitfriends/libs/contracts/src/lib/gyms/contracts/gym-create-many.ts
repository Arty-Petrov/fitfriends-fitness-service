import { GymCreateDto } from '../dto/gym-create.dto';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymCreateMany {
  export const topic = 'gym.create-many.command';

  export const queue = 'gym.create-many';

  export class Request extends Array<GymCreateDto> { }

  export class Response extends GymCardRdo { }
}
