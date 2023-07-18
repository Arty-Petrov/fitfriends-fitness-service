import { FeedMealType } from './feed-meal-type.enum';
import { Feed } from './feed.interface';

export interface FeedDiaryDay {
  date: Date;
  [FeedMealType.Breakfast]: Pick<Feed, 'id' | 'caloriesGain'>;
  [FeedMealType.Lunch]: Pick<Feed, 'id' | 'caloriesGain'>;
  [FeedMealType.Supper]: Pick<Feed, 'id' | 'caloriesGain'>;
  [FeedMealType.Snack]: Pick<Feed, 'id' | 'caloriesGain'>;
  dayCaloriesGain: number
}
