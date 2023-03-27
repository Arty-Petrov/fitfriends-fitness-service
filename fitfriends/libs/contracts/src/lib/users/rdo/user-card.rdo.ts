import { SubwayStation, TrainingType, UserExperience, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserCardRdo extends PickType(UserApi, [
  'name',
  'avatar',
  'role',
  'subwayStation',
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
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public role: UserRole;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public experience: UserExperience;

  @Expose()
  public trainingTypes: TrainingType[];

  @Expose()
  public isReadyForInvite: boolean;

  @Expose()
  public certificate: string;

  @Expose()
  public awards: string;

  @Expose()
  public isPersonalCoach: boolean;
}
