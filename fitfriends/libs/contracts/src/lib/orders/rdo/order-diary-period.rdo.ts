import { Expose } from 'class-transformer';
import { OrderDiaryDayRdo } from './order-diary-day.rdo';

export class OrderDiaryPeriodRdo {
  @Expose()
  periodData: OrderDiaryDayRdo[];

  @Expose()
  periodCaloriesLoss: number;
}
