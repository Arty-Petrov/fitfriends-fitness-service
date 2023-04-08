import { NotFoundException } from '@nestjs/common';

export class ItemNotFoundException extends NotFoundException {
  constructor(itemName: string, itemId: string | number) {
    super(`${itemName} with ID — ${itemId} is not found`);
  }
}
