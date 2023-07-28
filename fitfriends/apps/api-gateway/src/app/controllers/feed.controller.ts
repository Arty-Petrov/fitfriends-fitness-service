import {
  FeedBalanceDayRdo,
  FeedCreate,
  FeedCreateDto,
  FeedDiaryDayRdo,
  FeedGetBalance,
  FeedGetDiary,
  FeedUpdateData,
  FeedUpdateDataDto,
} from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post()
  @ApiResponse({
    type: FeedDiaryDayRdo,
    status: HttpStatus.OK,
    description: 'Feed data is created',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  public async create(
    @UserData('sub') userId: string,
    @Body() dto: FeedCreateDto
  ): Promise<FeedCreate.Response> {
    return await this.amqpConnection.request<FeedCreate.Response>({
      exchange: Exchanges.feed.name,
      routingKey: FeedCreate.topic,
      payload: { ...dto, authorId: userId },
    });
  }

  @Get()
  @ApiResponse({
    type: FeedDiaryDayRdo,
    status: HttpStatus.OK,
    description: 'Feed diary is found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getFeedDiary(
    @UserData('sub') userId: string
  ): Promise<FeedGetDiary.Response> {
    return await this.amqpConnection.request<FeedGetDiary.Response>({
      exchange: Exchanges.feed.name,
      routingKey: FeedGetDiary.topic,
      payload: { authorId: userId },
    });
  }

  @Get('balance')
  @ApiResponse({
    type: FeedBalanceDayRdo,
    status: HttpStatus.OK,
    description: 'Feed balance is found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getFeedBalance(
    @UserData('sub') userId: string
  ): Promise<FeedGetBalance.Response> {
    return await this.amqpConnection.request<FeedGetBalance.Response>({
      exchange: Exchanges.feed.name,
      routingKey: FeedGetBalance.topic,
      payload: { authorId: userId },
    });
  }

  @Patch()
  @ApiResponse({
    type: FeedDiaryDayRdo,
    status: HttpStatus.OK,
    description: 'Feed data is updated',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async updateData(
    @Body() dto: FeedUpdateDataDto,
    @UserData('sub') userId: string
  ): Promise<FeedUpdateData.Response> {
    return await this.amqpConnection.request<FeedUpdateData.Response>({
      exchange: Exchanges.feed.name,
      routingKey: FeedUpdateData.topic,
      payload: {
        ...dto,
        authorId: userId,
      },
    });
  }
}
