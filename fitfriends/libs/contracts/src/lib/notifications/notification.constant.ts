import { SortOrder } from '@fitfriends/shared-types';

export const DEFAULT_NOTIFICATION_PAGINATION_COUNT = 1;
export const DEFAULT_NOTIFICATION_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_NOTIFICATION_COUNT_LIMIT = 50;

export enum NotificationTextLength {
  Min = 10,
  Max = 140,
}

export const NotificationApiError = {
  TextIsNotValid: `The notification text must be min ${NotificationTextLength.Min}, max ${NotificationTextLength.Max} chars`,
} as const;

export const NotificationApiDescription = {
  Id: 'The notification uniq id',
  UserId: 'The id of user to whom notification is directed',
  Text: `The notification text, min ${NotificationTextLength.Min}, max ${NotificationTextLength.Max} chars`,
  CreatedAt: 'Automatic generated date of notification creation',
} as const;
