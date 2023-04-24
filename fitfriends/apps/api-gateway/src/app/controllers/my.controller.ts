import {
  OrderCoachListQuery,
  OrderGetCoachList,
  UserCardRdo,
  UserFriendListQuery,
  UserGetFriendList,
} from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('my')
export class MyController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

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
    return await this.amqpConnection.request<UserGetFriendList.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserGetFriendList.topic,
      payload: { ...query, userId: id },
    });
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
    return await this.amqpConnection.request<OrderGetCoachList.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderGetCoachList.topic,
      payload: { ...query, coachId: id },
    });
  }
}
