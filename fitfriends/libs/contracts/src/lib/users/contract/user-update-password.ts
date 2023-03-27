import { UserUpdatePasswordDto } from '../dto/user-update-password.dto';
import { UserLoggedRdo } from '../rdo/user-logged.rdo';

export namespace UserUpdatePassword {
  export const topic = 'user.update-password.command';

  export class Request extends UserUpdatePasswordDto { }

  export class Response extends UserLoggedRdo { }
}
