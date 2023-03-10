import { PickType } from '@nestjs/swagger';
import { GymApi } from '../gym.api';
import { GymRdo } from '../rdo/gym.rdo';

export namespace GymGetOne {
  export const topic = 'gym.get-one.query';

  export class Request extends PickType(GymApi, ['id']) { }

  export class Response extends GymRdo { }
}
