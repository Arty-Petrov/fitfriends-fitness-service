import { UserSignUpDto } from '../dto/user-sign-up.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserSignUp {
  export const topic = 'user.sign-up.command';

  export const queue = 'user.sign-up';

  export class Request extends UserSignUpDto { }

  export class Response extends UserRdo { }
}
