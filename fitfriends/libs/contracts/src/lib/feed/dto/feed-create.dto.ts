import { PickType } from '@nestjs/swagger';
import { FeedApi } from '../feed.api';

export class FeedCreateDto extends PickType(FeedApi, [
  'date',
  'mealOrdinal',
  'caloriesGain',
  'authorId',
]){}
