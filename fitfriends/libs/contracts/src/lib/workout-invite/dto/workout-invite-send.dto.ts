import { PickType } from '@nestjs/swagger';
import { WorkoutInviteApi } from '../workout-invite.api';

export class WorkoutInviteSendDto extends PickType(WorkoutInviteApi, [
  'authorId',
  'inviteeId',
]) { }
