import { SubwayStation, TrainingDuration as TrainingDuration, TrainingType, UserExperience, UserGender, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserRdo extends PickType(UserApi, [
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

  @Expose()
  public trainingDuration: TrainingDuration;

  @Expose()
  public caloriesLoss: number;

  @Expose()
  public caloriesConsumption: number;

  @Expose()
  public isReadyForInvite: boolean;

  @Expose()
  public certificate: string;

  @Expose()
  public awards: string;

  @Expose()
  public isPersonalCoach: boolean;
}
