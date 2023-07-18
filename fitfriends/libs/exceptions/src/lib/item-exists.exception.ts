import { NotAcceptableException } from '@nestjs/common';

export class ItemExistsException extends NotAcceptableException {
  constructor(name: string, dto: object) {
    super(`The ${name} record with data: ${JSON.stringify(dto).replace(/\"/g, ' ' )} already exists`);
  }
}
