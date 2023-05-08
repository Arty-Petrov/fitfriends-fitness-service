import { GymCardRdo, GymGetList, GymGetOne, GymToggleFavorite, OrderCreate } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { ProductType, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('gyms')
@Controller('gyms')
export class GymsController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('order/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Gym order created',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async create(
    @UserData('sub') userId: string,
    @Param('id', ParseIntPipe) itemId: number,
    @Body() dto: OrderCreate.Request
  ): Promise<OrderCreate.Response> {
    return await this.amqpConnection.request<OrderCreate.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderCreate.topic,
      payload: {
        ...dto,
        authorId: userId,
        productId: itemId,
        productType: ProductType.Gym
      },
    });
  }

  @Get(':id')
  @ApiResponse({
    type: GymCardRdo,
    status: HttpStatus.OK,
    description: 'Gym is found',
  })
  @UseGuards(JwtAccessGuard)
  public async getOne(
    @UserData('sub') userId: string,
    @Param('id') gymId: number
  ): Promise<GymGetOne.Response> {
    return await this.amqpConnection.request<GymGetOne.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymGetOne.topic,
      payload: { id: gymId, userId: userId },
    });
  }

  @Get()
  @ApiResponse({
    type: GymCardRdo,
    status: HttpStatus.OK,
    description: 'Gyms is found',
  })
  @UseGuards(JwtAccessGuard)
  public async getList(
    @UserData('sub') userId: string,
    @Query() query: GymGetList.Request
  ): Promise<GymGetList.Response> {
    return await this.amqpConnection.request<GymGetList.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymGetList.topic,
      payload: { ...query, userId: userId }
    });
  }

  @Patch('favorites/:id')
  @ApiResponse({
    type: GymCardRdo,
    status: HttpStatus.OK,
    description: 'Gyms is found',
  })
  @UseGuards(JwtAccessGuard)
  public async toggleFavoriteStatus(
    @UserData('sub') userId: string,
    @Param('id') itemId: number,
  ): Promise<GymToggleFavorite.Response> {
    return await this.amqpConnection.request<GymToggleFavorite.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymToggleFavorite.topic,
      payload: { userId: userId, itemId: itemId },
    });
  }
}

