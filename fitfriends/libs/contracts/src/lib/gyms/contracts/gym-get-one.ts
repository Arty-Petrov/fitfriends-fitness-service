import { PickType } from '@nestjs/swagger';
import { GymApi } from '../gym.api';
import { GymCardRdo } from '../rdo/gym-card.rdo';

export namespace GymGetOne {
  export const topic = 'gym.get-one.query';

  export const queue = 'gym.get-one';

  export class Request extends PickType(GymApi, ['id']) { }

  export class Response extends GymCardRdo { }
}
