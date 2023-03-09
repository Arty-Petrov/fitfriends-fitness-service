import { UserLoginDto } from '../dto/user-login.dto';
import { UserLoggedRdo } from '../rdo/user-logged.rdo';

export namespace UserLogin {
  export const topic = 'user.login.command';

  export class Request extends UserLoginDto { }

  export class Response extends UserLoggedRdo { }
}
