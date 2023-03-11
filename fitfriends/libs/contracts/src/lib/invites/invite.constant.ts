import { InviteStatus, SortOrder, UserRole } from '@fitfriends/shared-types';

export const DEFAULT_INVITE_PAGINATION_COUNT = 1;
export const DEFAULT_INVITE_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_INVITE_COUNT_LIMIT = 50;

export const InviteApiError = {
  StatusIsNotValid: `Invitation status must be one of fololowing values: ${Object.values(InviteStatus).join(', ')}`,
} as const;

export const InviteApiDescription = {
  Id: 'The uniq invite id',
  CustomerId: `User id of invite sender, it can be user with role ${UserRole.Customer}`,
  RecipientId: 'User id of invite reciever, it can be any user except invite sender',
  CreatedAt: 'Automatic generated date of invite creation',
  UpdatedAt: 'Automatic generated date of invitation status update',
  Status: `Invitation status, any of these values: ${Object.values(InviteStatus).join(', ')}`,
} as const;
