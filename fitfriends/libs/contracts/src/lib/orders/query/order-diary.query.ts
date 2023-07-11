import { PickType } from '@nestjs/swagger';
import { OrderQueryApi } from '../order-query.api';

export class OrderDiaryQuery extends PickType(OrderQueryApi, [
  'customerId'
]) { }
