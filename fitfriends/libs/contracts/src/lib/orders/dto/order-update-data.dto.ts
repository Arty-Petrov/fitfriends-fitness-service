import { PickType } from '@nestjs/swagger';
import { OrderApi } from '../order.api';

export class OrderUpdateDataDto extends PickType(OrderApi, [
  'id',
  'authorId',
  'productType',
  'productId',
  'quantity',
  'paymentMethod',
]) { }
