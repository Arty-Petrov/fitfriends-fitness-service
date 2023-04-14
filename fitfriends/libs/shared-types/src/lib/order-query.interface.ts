import { OrderSortType } from './order-sort-type.enum';
import { ProductType } from './product-type.enum';
import { Query } from './query.interface';
import { SortOrder } from './sort-order.enum';

export interface OrderQuery extends Query {
  page?: number;
  count?: number;
  sortCreation?: SortOrder;
  sortType?: OrderSortType;
  sortOrder?: SortOrder;
  type?: ProductType;
  coachId?: string;
}
