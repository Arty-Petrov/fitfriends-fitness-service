import { TrainingType } from './training-type.enum';
import { UserExperience } from './user-experience.enum';

export interface UserDataCoach {
  experience: UserExperience;
  trainingTypes: TrainingType[];
  certificate?: string;
  awards: string;
  isPersonalCoach?: boolean;
}
