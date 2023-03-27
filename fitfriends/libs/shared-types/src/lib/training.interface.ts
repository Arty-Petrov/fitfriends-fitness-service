import { TrainingDuration } from './training-duration.enum';
import { TrainingType } from './training-type.enum';
import { UserExperience } from './user-experience.enum';
import { UserGender } from './user-gender.enum';

export interface Training {
  id?: string;
  name: string;
  image: string;
  experience: UserExperience;
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
