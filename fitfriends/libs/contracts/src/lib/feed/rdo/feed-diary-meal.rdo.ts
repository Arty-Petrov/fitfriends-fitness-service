import { Expose } from 'class-transformer';

export class FeedDiaryMealRdo {
  @Expose()
  public id: number;

  @Expose()
  public mealOrdinal: number;

  @Expose()
  public caloriesGain: number;
}
