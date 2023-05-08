import { faker } from '@faker-js/faker';
import { OrderAmountRange, OrderCreateDto } from '@fitfriends/contracts';
import { Gym, PaymentMethod, ProductType, Training } from '@fitfriends/shared-types';

export const generateOrder = (
  customerId: string,
  product: Training | Gym,
  type: ProductType
): OrderCreateDto => ({
  authorId: customerId,
  productType: type,
  productId: product.id,
  productPrice: product.price,
  amount: faker.datatype.number({
    min: OrderAmountRange.Min,
    max: OrderAmountRange.Max,
  }),
  paymentMethod: faker.helpers.objectValue(PaymentMethod),
});
