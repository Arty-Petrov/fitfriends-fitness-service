import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export namespace UserLogout {
  export const topic = 'user.logout.command';

  export class Request extends PickType(UserApi, ['accessToken']) { }

  export class Response { }
}
