import { UserSignInDto } from '../dto/user-sign-in.dto';
import { UserSignedRdo } from '../rdo/user-signed.rdo';

export namespace UserSignIn {
  export const topic = 'user.login.command';

  export class Request extends UserSignInDto { }

  export class Response extends UserSignedRdo { }
}
