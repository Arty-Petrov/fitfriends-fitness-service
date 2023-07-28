import { WorkoutInviteStatus } from './workout-invite-status.enum';

export interface WorkoutInvite {
  id?: string;
  authorId: string;
  inviteeId: string;
  status?: WorkoutInviteStatus;
}
