import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderCardRdo } from '../rdo/order-card.rdo';

export namespace OrderCreateMany {
  export const topic = 'order.create-many.command';

  export class Request extends Array<OrderCreateDto> { }

  export class Response extends OrderCardRdo { }
}