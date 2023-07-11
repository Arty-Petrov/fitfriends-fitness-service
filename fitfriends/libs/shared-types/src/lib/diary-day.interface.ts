import { DiaryWorkout } from './diary-workout.interface';

export interface DiaryDay {
  date: string;
  dayData: DiaryWorkout[];
  dayCaloriesLoss: number;
}
