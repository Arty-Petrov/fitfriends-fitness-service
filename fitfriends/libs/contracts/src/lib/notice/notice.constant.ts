import { NoticeCategory, SortOrder, UserGender } from '@fitfriends/shared-types';

export const DEFAULT_NOTICE_PAGINATION_COUNT = 1;
export const DEFAULT_NOTICE_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_NOTICE_COUNT_LIMIT = 50;

export const NoticeApiError = {
  SenderGenderIsWrong: `The gender of user sender must contains any of these values: ${Object.values(UserGender).join(', ')}`,
  CategoryIsWrong: `The category of notice must contains any of these values: ${Object.values(NoticeCategory).join(', ')}`,
} as const;

export const NoticeApiDescription = {
  Id: 'The notification uniq ID',
  SenderId: 'The unique user ID',
  SenderName: 'The name of user sender',
  SenderGenger: `The gender of user sender is any of these values: ${Object.values(UserGender).join(', ')}`,
  RecepientId: 'The unique user recipient ID',
  Category: `The category of notice is any of these values: ${Object.values(NoticeCategory).join(', ')}`,
  Date: `The date of notice creation`,
  NoticeText: 'Automatic generated notice text',
} as const;
