import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserUpdateFriendListDto {
  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    required: true,
  })
  @IsMongoId()
  public friendId: string;
}
