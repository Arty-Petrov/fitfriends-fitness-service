import { Expose } from 'class-transformer';
import { OrderDiaryWorkoutRdo } from './order-diary-workout.rdo';

export class OrderDiaryDayRdo {
  @Expose()
  public date: Date;

  @Expose()
  public dayData: OrderDiaryWorkoutRdo[];

  @Expose()
  public dayCaloriesLoss: number;
}
