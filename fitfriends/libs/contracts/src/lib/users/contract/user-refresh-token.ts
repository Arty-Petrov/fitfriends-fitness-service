import { UserRefreshTokenDto } from '../dto/user-refresh-token.dto';
import { UserSignedRdo } from '../rdo/user-signed.rdo';

export namespace UserRefreshToken {
  export const topic = 'user.refresh-token.command';

  export class Request extends UserRefreshTokenDto { }

  export class Response extends UserSignedRdo { }
}
