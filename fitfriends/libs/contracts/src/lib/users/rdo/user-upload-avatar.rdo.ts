import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserUploadAvatarRdo extends PickType(UserApi, [
  'avatar',
]) {
  @Expose()
  public avatar: string;
}
