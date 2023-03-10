import { TrainingDuration } from './training-duration.enum';
import { TrainingType } from './training-type.enum';
import { UserExpirience } from './user-expirience.enum';
import { UserGender } from './user-gender.enum';
import { User } from './user.interface';

export interface Training {
  id?: string;
  name: string;
  backgroundImageUri: string;
  expirience: UserExpirience;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  caloriesLoss: number;
  description: string;
  gender: UserGender;
  video: string;
  trainerId: string;
  isSpecialOffer: boolean;
}
