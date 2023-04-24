import { PickType } from '@nestjs/swagger';
import { UserCardRdo } from '../rdo/user-card.rdo';
import { UserApi } from '../user.api';

export namespace UserGetOne {
  export const topic = 'user.get-one.query';

  export const queue = 'user.get-one';

  export class Request extends PickType(UserApi, ['id']) { }

  export class Response extends UserCardRdo { }
}
