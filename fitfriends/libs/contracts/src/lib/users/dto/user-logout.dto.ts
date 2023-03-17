import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserLogoutDto extends PickType(UserApi, ['accessToken']) { }
