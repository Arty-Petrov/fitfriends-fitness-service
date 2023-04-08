import { UnauthorizedException } from '@nestjs/common';

export class ItemNotExistsException extends UnauthorizedException {
  constructor(itemName: string, itemId: string) {
    super(`${itemName} with ID ${itemId} does not exists`);
  }
}
