import { UserRole, WorkoutInviteStatus } from '@fitfriends/shared-types';

export const WorkoutInviteApiError = {
  StatusIsNotValid: `Invitation status must be one of following values: ${Object.values(WorkoutInviteStatus).join(', ')}`,
} as const;

export const WorkoutInviteApiDescription = {
  Id: 'The uniq workout invite id',
  AuthorId: `The ID of workout invite sender, it can be only ${UserRole.Customer} user`,
  InviteeId: ` The ID of ${UserRole.Customer} or ${UserRole.Coach} user, how is not already invited by inviting ${UserRole.Customer} user`,
  Status: `Invitation status, any of these values: ${Object.values(WorkoutInviteStatus).join(', ')}`,
  CreatedAt: 'Automatic generated date of invite creation',
  UpdatedAt: 'Automatic generated date of invitation status update',
} as const;
