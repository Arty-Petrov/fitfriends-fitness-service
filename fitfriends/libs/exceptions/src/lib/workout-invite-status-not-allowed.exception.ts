import { WorkoutInviteStatus } from '@fitfriends/shared-types';
import { BadRequestException } from '@nestjs/common';

export class WorkoutInviteStatusNotAllowedException extends BadRequestException {
  constructor(currentStatus: WorkoutInviteStatus, newStatus: WorkoutInviteStatus) {
    super(`Workout invite status change from ${currentStatus} to ${newStatus} is nor allowed`);
  }
}
