import {
  OrderCoachListQuery,
  OrderGetCoachList,
  UserCardRdo,
  UserFriendListQuery,
  UserGetFriendList,
} from '@fitfriends/contracts';
import { UserRole } from '@fitfriends/shared-types';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RMQService } from 'nestjs-rmq';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

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
    @UserData('sub') id: string
  ): Promise<UserGetFriendList.Response> {
    return await this.rmqService.send<
      UserGetFriendList.Request,
      UserGetFriendList.Response
    >(UserGetFriendList.topic, { ...query, userId: id });
  }

  @Get('orders')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User friends found',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getMyTrainings(
    @Query() query: OrderCoachListQuery,
    @UserData('sub') id: string
  ): Promise<OrderGetCoachList.Response> {
    return await this.rmqService.send<
      OrderGetCoachList.Request,
      OrderGetCoachList.Response
    >(OrderGetCoachList.topic, { ...query, coachId: id });
  }
}
