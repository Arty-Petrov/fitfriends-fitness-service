import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserApi } from '../user.api';

export class UserRegisterDto extends PickType(UserApi, ['name', 'email', 'avatar', 'password', 'gender', 'dateBirth', 'role', 'subwayStation']) {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public avatar: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public dateBirth: Date;
}
