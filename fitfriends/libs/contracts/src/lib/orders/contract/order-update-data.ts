import { OrderUpdateDataDto } from '../dto/order-update-data.dto';
import { OrderCardRdo } from '../rdo/order-card.rdo';

export namespace OrderUpdateData {
  export const topic = 'order.update-data.command';

  export class Request extends OrderUpdateDataDto { }

  export class Response extends OrderCardRdo { }
}
