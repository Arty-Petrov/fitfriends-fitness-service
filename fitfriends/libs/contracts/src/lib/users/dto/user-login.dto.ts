import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserLoginDto extends PickType(UserApi, ['email', 'password']) { }
