import { PaymentMethod, ProductType } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrderApi } from '../order.api';

export class OrderListRdo extends PickType(OrderApi, ['id', 'authorId', 'productType', 'productPrice', 'amount', 'totalPrice', 'paymentMethod', 'createdAt']) {
  @Expose()
  public id: number;

  @Expose()
  public customerId: string;

  @Expose()
  public productType: ProductType;

  @Expose()
  public productId: number;

  @Expose()
  public productPrice: number;

  @Expose()
  public amount: number;

  @Expose()
  public totalPrice?: number;

  @Expose()
  public paymentMethod: PaymentMethod;

  @Expose()
  public createdAt?: Date;
}
