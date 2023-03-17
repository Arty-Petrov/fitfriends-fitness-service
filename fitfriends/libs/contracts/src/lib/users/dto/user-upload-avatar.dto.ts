import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserUploadAvatarDto extends PickType(UserApi, [
  'avatar',
]) {}
