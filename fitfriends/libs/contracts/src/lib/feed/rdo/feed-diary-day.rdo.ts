import { Expose } from 'class-transformer';
import { FeedDiaryMealRdo } from './feed-diary-meal.rdo';

export class FeedDiaryDayRdo {
  @Expose()
  public date: Date;

  @Expose()
  public dayData: FeedDiaryMealRdo[];

  @Expose()
  public dayCaloriesGain: number;
}
