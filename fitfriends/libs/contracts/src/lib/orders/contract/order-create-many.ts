import { HttpStatus } from '@nestjs/common';
import { OrderCreateDto } from '../dto/order-create.dto';

export namespace OrderCreateMany {
  export const topic = 'order.create-many.command';

  export const queue = 'order.create-many';

  export class Request extends Array<OrderCreateDto> { }

  export class Response {
    public statusCode: HttpStatus;
  }
}
