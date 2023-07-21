import { NotAcceptableException } from '@nestjs/common';

export class ItemDataIsNotMatchException extends NotAcceptableException {
  constructor(name: string, currentData: object, newData: object) {
    super(
      `The ${name} record with data:
${JSON.stringify(currentData).replace(/"/g, ' ')}
isn't match new data:
${JSON.stringify(newData).replace(/"/g, ' ')}
`);
  }
}
