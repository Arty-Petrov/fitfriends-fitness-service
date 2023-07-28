import {
  WorkoutInviteAnswer,
  WorkoutInviteAnswerDto,
  WorkoutInviteSend,
  WorkoutInviteSendDto,
} from '@fitfriends/contracts';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, HttpStatus } from '@nestjs/common';
import { WorkoutInviteService } from './workout-invite.service';

@Controller()
export class WorkoutInviteController {
  constructor(private readonly workoutInviteService: WorkoutInviteService) { }

  @RabbitRPC({
    exchange: Exchanges.invite.name,
    routingKey: WorkoutInviteSend.topic,
    queue: WorkoutInviteSend.queue,
    errorHandler: rmqErrorCallback,
  })
  public async sendInvite(dto: WorkoutInviteSendDto): Promise<HttpStatus> {
    await this.workoutInviteService.create(dto);
    return HttpStatus.CREATED;
  }

  @RabbitRPC({
    exchange: Exchanges.invite.name,
    routingKey: WorkoutInviteAnswer.topic,
    queue: WorkoutInviteAnswer.queue,
    errorHandler: rmqErrorCallback,
  })
  public async answerInvite(dto: WorkoutInviteAnswerDto): Promise<HttpStatus> {
    await this.workoutInviteService.update(dto);
    return HttpStatus.OK;
  }
}
