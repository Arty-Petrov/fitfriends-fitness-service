import { PickType } from '@nestjs/swagger';
import { TrainingQueryApi } from '../training-query.api';

export class TrainingMyListQuery extends PickType(TrainingQueryApi, [
  'page',
  'count',
  'sortCreation',
  'priceMin',
  'priceMax',
  'caloriesMin',
  'caloriesMax',
  'ratingMin',
  'ratingMax',
  'durations',
  'authorId'
]) {}
