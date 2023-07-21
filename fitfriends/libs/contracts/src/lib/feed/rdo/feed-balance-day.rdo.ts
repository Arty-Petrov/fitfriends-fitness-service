import { Expose } from 'class-transformer';

export class FeedBalanceDayRdo {
  @Expose()
  public date: Date;

  @Expose()
  public dayCaloriesGain: number;

  @Expose()
  public dayCaloriesLoss: number;

  @Expose()
  public dayCaloriesTotal: number;
}
