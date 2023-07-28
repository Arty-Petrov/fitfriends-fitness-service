import {
  SubscriberCreate,
  SubscriberCreateDto,
  SubscriberDelete,
  SubscriberDeleteDto,
  UserGetOne,
} from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { TokenPayload, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('subscriber')
@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('set')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is successfully subscribed',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async subscribe(
    @UserData() user: TokenPayload,
    @Body() { publisherId }: SubscriberCreateDto
  ): Promise<SubscriberCreate.Response> {
    const {
      sub: subscriberId,
      email: subscriberEmail,
      name: subscriberName,
    } = user;
    const { name: publisherName, email: publisherEmail } = await
      this.amqpConnection.request<UserGetOne.Response>({
        exchange: Exchanges.user.name,
        routingKey: UserGetOne.topic,
        payload: { id: publisherId },
      });
    return  await this.amqpConnection.request<SubscriberCreate.Response>({
      exchange: Exchanges.subscriber.name,
      routingKey: SubscriberCreate.topic,
      payload: {
        publisherId: publisherId,
        publisherName: publisherName,
        publisherEmail: publisherEmail,
        subscriberId: subscriberId,
        subscriberName: subscriberName,
        subscriberEmail: subscriberEmail,
      },
    });
  }

  @Delete('unset')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User is successfully unsubscribed',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async unsubscribe(
    @UserData('sub') subscriberId: TokenPayload,
    @Body() { publisherId }: SubscriberDeleteDto
  ): Promise<SubscriberDelete.Response> {
    return await this.amqpConnection.request<SubscriberDelete.Response>({
      exchange: Exchanges.subscriber.name,
      routingKey: SubscriberDelete.topic,
      payload: {
        publisherId: publisherId,
        subscriberId: subscriberId,
      },
    });
  }
}
