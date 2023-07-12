import { PickType } from '@nestjs/swagger';
import { OrderApi } from '../order.api';

export class OrderCreateDto extends PickType(OrderApi, [
  'authorId',
  'productType',
  'productId',
  'productPrice',
  'amount',
  'paymentMethod',
]) { }
