import { UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { UserApi } from '../user.api';

export class UserRefreshTokenDto extends PickType(UserApi, ['email', 'name', 'role', 'refreshTokenId']) {
  @Expose()
  @IsMongoId()
  public sub: string;

  @Expose()
  public email: string;

  @Expose()
  public name: string;

  @Expose()
  public role: UserRole;
  
  @IsOptional()
  public refreshTokenId?: string;
}
