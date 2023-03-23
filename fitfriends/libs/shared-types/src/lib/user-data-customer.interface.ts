import { TrainingDuration } from './training-duration.enum';
import { TrainingType } from './training-type.enum';
import { UserExperience } from './user-experience.enum';

export interface UserDataCustomer {
  experience: UserExperience;
  trainingType: TrainingType;
  trainingDuration: TrainingDuration;
  caloriesLoss: number;
  caloriesConsumption: number;
  isReadyForInvite: boolean;
}
