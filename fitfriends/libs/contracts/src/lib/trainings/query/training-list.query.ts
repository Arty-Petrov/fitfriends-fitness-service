import { PickType } from '@nestjs/swagger';
import { TrainingQueryApi } from '../training-query.api';

export class TrainingListQuery extends PickType(TrainingQueryApi,[
  'page',
  'count',
  'sortCreation',
  'sortPrice',
  'priceMin',
  'priceMax',
  'caloriesMin',
  'caloriesMax',
  'ratingMin',
  'ratingMax',
  'types',
]) {}
