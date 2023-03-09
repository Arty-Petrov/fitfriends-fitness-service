import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserUpdatePasswordDto extends PickType(UserApi, ['email', 'currentPassword', 'updatePassword']) { }
