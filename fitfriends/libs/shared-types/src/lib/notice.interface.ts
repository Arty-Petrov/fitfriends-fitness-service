import { NoticeCategory } from './notice-category.enum';
import { UserGender } from './user-gender.enum';

export interface Notice {
  id?: string;
  senderId: string;
  senderName: string;
  senderGender: UserGender;
  recipientId: string;
  category: NoticeCategory;
  createdAt?: Date;
}
