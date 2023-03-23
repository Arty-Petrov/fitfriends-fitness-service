import { TokenPayload, UserRole } from '@fitfriends/shared-types';

export namespace UserValidateToken {
  export const topic = 'user.validate-token.command';

  export class Request {
    token: string;
  }

  export class Response implements TokenPayload {
    sub: string;
    email: string;
    role: UserRole;
    name: string;
  }
}
