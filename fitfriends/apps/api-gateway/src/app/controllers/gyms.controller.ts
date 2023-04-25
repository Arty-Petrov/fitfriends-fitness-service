import { GymCardRdo, GymGetList, GymGetOne } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@ApiTags('gyms')
@Controller('gyms')
export class GymsController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get(':id')
  @ApiResponse({
    type: GymCardRdo,
    status: HttpStatus.OK,
    description: 'Gym is found',
  })
  @UseGuards(JwtAccessGuard)
  public async getOne(
    @Param('id') gymId: number
  ): Promise<GymGetOne.Response> {
    return await this.amqpConnection.request<GymGetOne.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymGetOne.topic,
      payload: { id: gymId },
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
    @Query() dto: GymGetList.Request
  ): Promise<GymGetList.Response> {
    return await this.amqpConnection.request<GymGetList.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymGetList.topic,
      payload: dto,
    });
  }
}
