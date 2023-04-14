import { Query } from './query.interface';
import { SortOrder } from './sort-order.enum';

export interface ReviewQuery extends Query {
  page?: number;
  count?: number;
  sortCreation?: SortOrder;
  trainingId?: number;
}
