import { UnauthorizedException } from '@nestjs/common';

export class UserNotAuthorizedException extends UnauthorizedException {
  constructor(itemId: string | number) {
    super(`You are not authorized to edit item with ID ${itemId}`);
  }
}
