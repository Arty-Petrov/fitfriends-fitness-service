import { ForbiddenException, HttpStatus } from '@nestjs/common';

export class UserAuthenticatedException extends ForbiddenException {
  constructor(email: string, token: string) {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: `The client is already authenticated with email ${email}`,
        access_token: token
      },
    );
  }
}
