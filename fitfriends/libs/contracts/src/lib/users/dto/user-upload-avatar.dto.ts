import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserApi } from '../user.api';

export class UserUploadAvatarDto extends PickType(UserApi, [
  'id',
  'avatar',
]) {
  @IsOptional()
  public id: string;
}
