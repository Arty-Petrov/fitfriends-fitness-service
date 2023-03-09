import { SubwayStation, TrainingType, UserExpirience, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserListRdo extends PickType(UserApi, ['name', 'avatar', 'role', 'location', 'expirience', 'createdAt', 'traningType', 'isReadyForInvite', 'isPersonalTrainer']) {
  @Expose()
  public name: string;

  @Expose()
  public avatar: string;

  @Expose()
  public role: UserRole;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public expirience: UserExpirience;

  @Expose()
  public traningType: TrainingType[];

  @Expose()
  public createdAt: Date;

  @Expose()
  public isReadyForInvite: boolean;

  @Expose()
  public isPersonalTrainer: boolean;
}
