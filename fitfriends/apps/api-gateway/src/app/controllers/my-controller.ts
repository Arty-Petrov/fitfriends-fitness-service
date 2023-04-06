import { UserCardRdo, UserFriendListQuery, UserGetFriendList } from '@fitfriends/contracts';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@Controller('my')
export class MyController {
  constructor(private readonly rmqService: RMQService) {}

  @Get('friends')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User friends found',
  })
  @UseGuards(JwtAccessGuard)
  async getFriends(
    @Query() query: UserFriendListQuery,
    @UserData('sub') id: string,
  ): Promise<UserGetFriendList.Response> {
      return await this.rmqService.send<UserGetFriendList.Request, UserGetFriendList.Response>(
        UserGetFriendList.topic,
        { ...query,  userId: id  }
      );
    }

}
