import { SubwayStation } from './subway-station.enum';
import { TrainingDuration } from './training-duration.enum';
import { TrainingType } from './training-type.enum';
import { UserExpirience } from './user-expirience.enum';
import { UserGender } from './user-gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  passwordHash?: string;
  gender: UserGender;
  dateBirth?: Date;
  role: UserRole;
  location: SubwayStation;
  createdAt?: Date;
  expirience: UserExpirience;
  traningType: TrainingType[];
  trainingDuration: TrainingDuration;
  caloriesLoss: number;
  caloriesConsumption?: number;
  isReadyForInvite?: boolean;
  sertificate: string;
  awards: string;
  isPersonalTrainer: boolean;
}
