import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderCardRdo } from '../rdo/order-card.rdo';

export namespace OrderCreate {
  export const topic = 'order.create.command';

  export const queue = 'order.create';

  export class Request extends OrderCreateDto { }

  export class Response extends OrderCardRdo { }
}
