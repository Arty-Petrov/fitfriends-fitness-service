import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserLoggedRdo extends PickType(UserApi, ['name', 'email', 'avatar', 'role', 'accessToken']) { }
