import { faker } from '@faker-js/faker';
import { OrderCreateDto, OrderQuantityRange } from '@fitfriends/contracts';
import { PaymentMethod, ProductType, Training } from '@fitfriends/shared-types';

export const generateOrder = (
  customerId: string,
  product: Training 
): OrderCreateDto => ({
  authorId: customerId,
  productType: ProductType.Training,
  productId: product.id,
  productPrice: product.price,
  quantity: faker.datatype.number({
    min: OrderQuantityRange.Min,
    max: OrderQuantityRange.Max,
  }),
  paymentMethod: faker.helpers.objectValue(PaymentMethod),
});
