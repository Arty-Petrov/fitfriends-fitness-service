import { SubwayStation, TrainingType, UserExperience, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserListRdo extends PickType(UserApi, [
  'id',
  'name',
  'avatar',
  'role',
  'location',
  'experience',
  'createdAt',
  'trainingTypes',
  'isReadyForInvite',
  'isPersonalCoach',
]) {
  @Expose()
  public id: string;

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
  public createdAt: Date;

  @Expose()
  @Transform(({ obj, value }) =>
    obj.isPersonalCoach !== undefined ? obj.isPersonalCoach : value
  )
  public isReadyForInvite: boolean;

  public isPersonalCoach: boolean;
}
