import { PaymentMethod } from './payment-method.enum';
import { ProductType } from './product-type.enum';

export interface Purchase {
  id?: string;
  customerId: string;
  productType: ProductType;
  productId: number;
  productPrice: number;
  quantity: number;
  totalPrice?: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
}