import { SubwayStation } from './subway-station.enum';
import { TrainingDuration } from './training-duration.enum';
import { TrainingType } from './training-type.enum';
import { UserExperience } from './user-experience.enum';
import { UserGender } from './user-gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  passwordHash?: string;
  gender: UserGender;
  dateBirth?: Date;
  role: UserRole;
  subwayStation: SubwayStation;
  createdAt?: Date;
  experience?: UserExperience;
  trainingTypes?: TrainingType[];
  certificate?: string;
  awards?: string;
  isPersonalCoach?: boolean;
  trainingDuration?: TrainingDuration;
  caloriesLoss?: number;
  caloriesConsumption?: number;
  isReadyForInvite?: boolean;
}
