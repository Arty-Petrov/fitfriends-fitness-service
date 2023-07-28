import { SenderSendNewTraining } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { TokenPayload, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('sender')
@Controller('sender')
export class SenderController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('trainings')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Trainings newsletters is sent',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async create(
    @UserData() user: TokenPayload,
  ): Promise<SenderSendNewTraining.Response> {
    const { sub: id, name } = user;
    return await this.amqpConnection.request<SenderSendNewTraining.Response>({
      exchange: Exchanges.sender.name,
      routingKey: SenderSendNewTraining.topic,
      payload: {
        publisherId: id,
        publisherName: name
      }
    });
  }
}
