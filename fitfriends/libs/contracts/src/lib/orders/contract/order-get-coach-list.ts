import { OrderCoachListQuery } from '../query/order-coach-list.query';
import { OrderCoachListRdo } from '../rdo/order-coach-list.rdo';

export namespace OrderGetCoachList {
  export const topic = 'order.get-coach-list.query';

  export class Request extends OrderCoachListQuery { }

  export class Response extends Array<OrderCoachListRdo> { }
}
