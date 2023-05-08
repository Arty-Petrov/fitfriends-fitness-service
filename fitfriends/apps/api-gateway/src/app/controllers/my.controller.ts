import {
  GymCardRdo,
  GymGetFavoriteList,
  OrderCoachListQuery,
  OrderCoachListRdo,
  OrderCustomerListQuery,
  OrderCustomerListRdo,
  OrderGetCoachList,
  OrderGetCustomerList,
  UserCardRdo,
  UserFriendListQuery,
  UserGetFriendList,
} from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, HttpStatus, NotImplementedException, Query, UseGuards } from '@nestjs/common';
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
    type: OrderCoachListRdo,
    status: HttpStatus.OK,
    description: 'Coache\'s orders found',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getMyOrders(
    @Query() query: OrderCoachListQuery,
    @UserData('sub') userId: string
  ): Promise<OrderGetCoachList.Response> {
    return await this.amqpConnection.request<OrderGetCoachList.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderGetCoachList.topic,
      payload: { ...query, coachId: userId },
    });
  }

  @Get('purchases')
  @ApiResponse({
    type: OrderCustomerListRdo,
    status: HttpStatus.OK,
    description: 'Customers\'s purchases found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getMyPurchases(
    @Query() query: OrderCustomerListQuery,
    @UserData('sub') userId: string
  ): Promise<OrderGetCustomerList.Response> {
    return await this.amqpConnection.request<OrderGetCustomerList.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderGetCustomerList.topic,
      payload: { ...query, customerId: userId },
    });
  }

  @Get('gyms')
  @ApiResponse({
    type: GymCardRdo,
    status: HttpStatus.OK,
    description: 'Favorite gyms is found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  public async getFavoriteList(
    @UserData('sub') userId: string,
    @Query() query: GymGetFavoriteList.Request
  ): Promise<GymGetFavoriteList.Response> {
    return await this.amqpConnection.request<GymGetFavoriteList.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymGetFavoriteList.topic,
      payload: { ...query, userId: userId },
    });
  }

  @Get('purchases')
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  public async getPurchases() {
    throw new NotImplementedException();
  }

  @Get('activity')
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  public async getActivity() {
    throw new NotImplementedException();
  }

  @Get('feeding')
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  public async getFeeding() {
    throw new NotImplementedException();
  }
}
