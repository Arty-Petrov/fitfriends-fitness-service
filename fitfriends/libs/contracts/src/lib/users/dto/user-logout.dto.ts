import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserLogoutDto extends PickType(UserApi, ['refreshTokenId']) {
@Expose()
public refreshTokenId?: string;
}
