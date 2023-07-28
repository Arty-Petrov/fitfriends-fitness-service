import { ForbiddenException } from '@nestjs/common';

export class WorkoutInviteForbiddenException extends ForbiddenException {
  constructor(userEmail: string) {
    super(`The user with email ${userEmail} is not available for workout invites`);
  }
}
