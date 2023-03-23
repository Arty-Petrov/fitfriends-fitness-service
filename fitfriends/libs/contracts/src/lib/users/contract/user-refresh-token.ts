import { UserRefreshTokenDto } from '../dto/user-refresh-token.dto';
import { UserLoggedRdo } from '../rdo/user-logged.rdo';

export namespace UserRefreshToken {
  export const topic = 'user.refresh-token.command';

  export class Request extends UserRefreshTokenDto { }

  export class Response extends UserLoggedRdo { }
}
