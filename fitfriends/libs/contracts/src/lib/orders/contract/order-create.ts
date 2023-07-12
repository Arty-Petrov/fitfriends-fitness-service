import { HttpStatus } from '@nestjs/common';
import { OrderCreateDto } from '../dto/order-create.dto';

export namespace OrderCreate {
  export const topic = 'order.create.command';

  export const queue = 'order.create';

  export class Request extends OrderCreateDto { }

  export class Response {
  public statusCode: HttpStatus;
  }
}
