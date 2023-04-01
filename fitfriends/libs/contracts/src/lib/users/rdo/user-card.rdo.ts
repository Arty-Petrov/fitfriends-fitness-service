import { SubwayStation, TrainingDuration, TrainingType, UserExperience, UserGender, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserCardRdo extends PickType(UserApi, [
  'id',
  'name',
  'email',
  'avatar',
  'gender',
  'dateBirth',
  'role',
  'subwayStation',
  'createdAt',
  'experience',
  'trainingTypes',
  'trainingDuration',
  'caloriesLoss',
  'caloriesConsumption',
  'isReadyForInvite',
  'certificate',
  'awards',
  'isPersonalCoach',
]) {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public dateBirth: Date;

  @Expose()
  public role: UserRole;

  @Expose()
  public subwayStation: SubwayStation;

  @Expose()
  public createdAt: Date;

  @Expose()
  public experience: UserExperience;

  @Expose()
  public trainingTypes: TrainingType[];

  @Expose({groups: [UserRole.Customer]})
  public trainingDuration: TrainingDuration;

  @Expose({groups: [UserRole.Customer]})
  public caloriesLoss: number;

  @Expose({groups: [UserRole.Customer]})
  public caloriesConsumption: number;

  @Expose({groups: [UserRole.Customer]})
  public isReadyForInvite: boolean;

  @Expose({groups: [UserRole.Coach]})
  public certificate: string;

  @Expose({groups: [UserRole.Coach]})
  public awards: string;

  @Expose({groups: [UserRole.Coach]})
  public isPersonalCoach: boolean;
}
