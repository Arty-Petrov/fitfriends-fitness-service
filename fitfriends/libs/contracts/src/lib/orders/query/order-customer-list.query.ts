import { PickType } from '@nestjs/swagger';
import { OrderQueryApi } from '../order-query.api';

export class OrderCustomerListQuery extends PickType(OrderQueryApi, [
  'page',
  'count',
  'sortCreation',
  'type',
  'isActive',
  'customerId'
]) { }
