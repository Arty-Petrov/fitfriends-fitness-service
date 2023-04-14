import { Query } from './query.interface';
import { SortOrder } from './sort-order.enum';
import { TrainingDuration } from './training-duration.enum';
import { TrainingPriceSortType } from './training-price-sort-type.enum';
import { TrainingType } from './training-type.enum';

export interface TrainingQuery extends Query {
  page?: number;
  count?: number;
  sortCreation?: SortOrder;
  sortPrice?: TrainingPriceSortType
  priceMin?: number;
  priceMax?: number;
  caloriesMin?: number;
  caloriesMax?: number;
  ratingMin?: number;
  ratingMax?: number;
  types?: TrainingType[];
  durations?: TrainingDuration[];
  authorId?: string;
}
