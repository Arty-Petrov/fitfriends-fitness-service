import { ReviewCardRdo, ReviewCreate, ReviewGetList, ReviewListQuery } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post(':id')
  @ApiResponse({
    type: ReviewCardRdo,
    status: HttpStatus.OK,
    description: 'Review is created',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async create(
    @UserData('sub') userId: string,
    @Param('id') itemId: number,
    @Body() dto: ReviewCreate.Request
  ): Promise<ReviewCreate.Response> {
    return await this.amqpConnection.request<ReviewCreate.Response>({
      exchange: Exchanges.reviews.name,
      routingKey: ReviewCreate.topic,
      payload: { ...dto, authorId: userId, trainingId: itemId },
    });
  }

  @Get(':id')
  @ApiResponse({
    type: ReviewCardRdo,
    status: HttpStatus.OK,
    description: 'Reviews are found',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async getList(
    @Param('id') itemId: number,
    @Query() query: ReviewListQuery,
  ): Promise<ReviewGetList.Response> {
    return await this.amqpConnection.request<ReviewGetList.Response>({
      exchange: Exchanges.reviews.name,
      routingKey: ReviewGetList.topic,
      payload: { ...query, trainingId: itemId },
    });
  }
}
