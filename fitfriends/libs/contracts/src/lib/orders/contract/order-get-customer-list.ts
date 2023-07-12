import { OrderCustomerListQuery } from '../query/order-customer-list.query';
import { OrderCustomerListRdo } from '../rdo/order-customer-list.rdo';

export namespace OrderGetCustomerList {
  export const topic = 'order.get-customer-list.query';

  export const queue = 'order.get-customer-list';

  export class Request extends OrderCustomerListQuery { }

  export class Response extends Array<OrderCustomerListRdo> { }
}
