import { OrderCardRdo, OrderCreate, OrderDiaryPeriodRdo, OrderGetDiary, OrderUpdateData } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { ProductType, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async createOrder(
    @UserData('sub') userId: string,
    @Body() dto: OrderCreate.Request
  ): Promise<OrderCreate.Response> {
    return await this.amqpConnection.request<OrderCreate.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderCreate.topic,
      payload: {
        ...dto,
        authorId: userId,
        productType: ProductType.Training
      },
    });
  }

  @Get('diary')
  @ApiResponse({
    type: OrderDiaryPeriodRdo,
    status: HttpStatus.OK,
    description: 'Diary data is found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getDiary(
    @UserData('sub') userId: string
  ): Promise<OrderGetDiary.Response> {
    return await this.amqpConnection.request<OrderGetDiary.Response>({
      exchange: Exchanges.orders.name,
      routingKey: OrderGetDiary.topic,
      payload: { customerId: userId },
    });
  }

  @Patch()
  @ApiResponse({
    type: OrderCardRdo,
    status: HttpStatus.OK,
    description: 'Order data is updated',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async updateData(
    @Body() dto: OrderUpdateData.Request,
    @UserData('sub') userId: string
  ): Promise<OrderUpdateData.Response> {
    return await this.amqpConnection.request<OrderUpdateData.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: OrderUpdateData.topic,
      payload: {
        ...dto,
        authorId: userId,
      },
    });
  }
}
