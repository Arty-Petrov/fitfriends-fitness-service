import { PickType } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';
import { UserApi } from '../user.api';

export class UserSignInDto extends PickType(UserApi, ['email', 'password']) {
  @ValidateIf(() => false)
  public password: string;
}
