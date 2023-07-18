import { PickType } from '@nestjs/swagger';
import { FeedApi } from '../feed.api';

export class FeedUpdateDataDto extends PickType(FeedApi, [
  'id',
  'date',
  'mealOrdinal',
  'caloriesGain',
  'authorId',
]){
}
