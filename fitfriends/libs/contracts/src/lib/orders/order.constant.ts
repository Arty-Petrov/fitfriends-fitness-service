import { OrderSortType, PaymentMethod, ProductType, SortOrder, TrainingDuration } from '@fitfriends/shared-types';

export const DEFAULT_ORDERS_PAGINATION_COUNT = 1;
export const DEFAULT_ORDERS_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_ORDERS_SORT_TYPE = OrderSortType.Quantity;
export const DEFAULT_ORDERS_COUNT_LIMIT = 50;

export enum OrderQuantityRange {
  Min = 1,
  Max = 50,
}

export const OrderApiError = {
  ProductTypeIsNotValid: `Product type field must contains any of these values: ${Object.values(ProductType).join(', ')}`,
  QuantityIsNotValid: `Quantity must be in range ${OrderQuantityRange.Min}, max ${OrderQuantityRange.Max}`,
  PaymentMethodIsNotValid: `Training Time field must contain any of these values: ${Object.values(TrainingDuration).join(', ')}`,
} as const;

export const OrderApiDescription = {
  Id: 'The uniq order id',
  AuthorId: 'The uniq customer id',
  ProductType: `A type of product any of these values: ${Object.values(ProductType).join(', ')}`,
  ProductId: 'The uniq id of ordering product',
  ProductPrice: 'Price for one unit of product',
  Quantity: 'Quantity of ordering products',
  TotalPrice: 'Price for all purchasing products',
  PaymentMethod: `A type of payment method, any of these values: ${Object.values(PaymentMethod).join(', ')}`,
  CreatedAt: 'Automatic generated date of order creation',
} as const;
