import { WorkoutInviteStatus } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { WorkoutInviteApi } from '../workout-invite.api';

export class WorkoutInviteAnswerDto extends PickType(WorkoutInviteApi, [
  'authorId',
  'inviteeId',
  'status'
]) {
  public status: WorkoutInviteStatus.Accepted | WorkoutInviteStatus.Rejected;
}
