import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserSignOutDto extends PickType(UserApi, ['refreshTokenId']) {}
