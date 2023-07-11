import { OrderDiaryQuery } from '../query/order-diary.query';
import { OrderDiaryPeriodRdo } from '../rdo/order-diary-period.rdo';

export namespace OrderGetDiary {
  export const topic = 'order.get-diary.query';

  export const queue = 'order.get-diary';

  export class Request extends OrderDiaryQuery { }

  export class Response extends OrderDiaryPeriodRdo { }
}
