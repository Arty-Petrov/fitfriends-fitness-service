import { OrderStatus } from './order-status.enum';
import { PaymentMethod } from './payment-method.enum';
import { ProductType } from './product-type.enum';

export interface Order {
  id?: number;
  authorId: string;
  productType: ProductType;
  productId: number;
  productPrice: number;
  status?: OrderStatus;
  totalPrice?: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
  updatedAt?: Date;
}
