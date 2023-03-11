import { PaymentMethod, ProductType, SortOrder } from '@fitfriends/shared-types';

export const DEFAULT_PURCHASE_PAGINATION_COUNT = 1;
export const DEFAULT_PURCHASE_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_PURCHASE_COUNT_LIMIT = 50;

export enum PurchaseQuantityRange {
  Min = 1,
  Max = 50,
}

export const PurchaseApiError = {
  ProductTypeIsNotValide: `Product type field must contains any of these values: ${Object.values(ProductType).join(', ')}`,
  QuatnityIsNotValid: `Quantity must be in range ${PurchaseQuantityRange.Min}, max ${PurchaseQuantityRange.Max}`,
  PaymentMethodIsNotValide: `Training Time field must contain any of these values: ${Object.values(TrainingDuration).join(', ')}`,
} as const;

export const PurchaseApiDescription = {
  Id: 'The uniq purchase id',
  CustomerId: 'The uniq customer id',
  ProductType: `A type of product any of these values: ${Object.values(ProductType).join(', ')}`,
  ProductId: 'The uniq id of purchasing product',
  ProductPrice: 'Price for one unit of product',
  Quantity: 'Quantity of purchasing products',
  TotalPrice: 'Price for all purchasing products',
  PaymentMethod: `A type of payment method, any of these values: ${Object.values(PaymentMethod).join(', ')}`,
  CreatedAt: 'Automatic generated date of purchase creation',
} as const;
