import { SubwayStation } from './subway-station.enum';
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
  subwayStation: SubwayStation;
  createdAt?: Date;
}
