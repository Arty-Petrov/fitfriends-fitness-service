import { HttpStatus } from '@nestjs/common';
import { UserSignOutDto } from '../dto/user-sign-out.dto';

export namespace UserSignOut {
  export const topic = 'user.logout.command';

  export class Request extends UserSignOutDto{ }

  export class Response {
    public statusCode: HttpStatus;
  }
}
