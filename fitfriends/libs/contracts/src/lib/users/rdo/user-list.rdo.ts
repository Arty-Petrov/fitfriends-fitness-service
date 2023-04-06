import { SubwayStation, TrainingType, UserExperience, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserListRdo extends PickType(UserApi, ['name', 'avatar', 'role', 'location', 'experience', 'createdAt', 'trainingTypes', 'isReadyForInvite', 'isPersonalCoach']) {
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
  public isReadyForInvite: boolean;

  @Expose()
  public isPersonalCoach: boolean;
}
