import { Expose } from 'class-transformer';
import { FeedDiaryDayRdo } from './feed-diary-day.rdo';

export class FeedDiaryPeriodRdo {
  @Expose()
  public periodData: FeedDiaryDayRdo[];

  @Expose()
  public periodCaloriesGain: number;
}
