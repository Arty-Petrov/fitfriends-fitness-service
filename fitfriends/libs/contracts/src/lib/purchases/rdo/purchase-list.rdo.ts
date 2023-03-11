import { PaymentMethod, ProductType } from '@fitfriends/shared-types';
import { Expose } from 'class-transformer';

export class PurchaseListRdo extends PickType(PurchaseApi, ['id', 'customerId', 'productType', 'productPrice', 'quantity', 'totalPrice', 'paymentMethod', 'createdAt']) {
  @Expose()
  public id: string;

  @Expose()
  public customerId: string;

  @Expose()
  public productType: ProductType;

  @Expose()
  public productId: number;

  @Expose()
  public productPrice: number;

  @Expose()
  public quantity: number;

  @Expose()
  public totalPrice?: number;

  @Expose()
  public paymentMethod: PaymentMethod;

  @Expose()
  public createdAt?: Date;
}
