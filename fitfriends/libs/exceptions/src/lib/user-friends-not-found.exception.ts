import { NotFoundException } from '@nestjs/common';

export class UserFriendsNotFoundException extends NotFoundException {
  constructor(userId: string) {
    super(`User with the id — ${userId} have no friend list, nothing to delete`);
  }
}
