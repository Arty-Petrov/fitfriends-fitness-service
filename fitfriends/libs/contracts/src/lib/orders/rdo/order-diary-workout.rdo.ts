import { TrainingDuration } from '@fitfriends/shared-types';
import { Expose } from 'class-transformer';

export class OrderDiaryWorkoutRdo {
  @Expose()
  public ordinal: number;

  @Expose()
  public duration: TrainingDuration;

  @Expose()
  public caloriesLoss: number;
}
