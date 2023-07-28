import { Notice, NoticeCategory, UserGender } from '@fitfriends/shared-types';
import { Expose, Transform } from 'class-transformer';

const Message = {
  [UserGender.NotSet]: {
    [NoticeCategory.NewFriend]: (name: string) => `Пользователь ${name} добавил вас в друзья.`,
    [NoticeCategory.WorkoutInviteAccepted]: (name: string) => `Пользователь ${name} принял приглашение на совместную тренировку.`,
    [NoticeCategory.WorkoutInviteRecieved]: (name: string) => `Пользователь ${name} пригласил вас на тренировку`,
    [NoticeCategory.WorkoutInviteRejected]: (name: string) => `Пользователь ${name} отклонил приглашение на совместную тренировку`,
  },
  [UserGender.Male]: {
    [NoticeCategory.NewFriend]: (name: string) => `${name} добавил вас в друзья.`,
    [NoticeCategory.WorkoutInviteAccepted]: (name: string) => `${name} принял приглашение на совместную тренировку.`,
    [NoticeCategory.WorkoutInviteRecieved]: (name: string) => `${name} пригласил вас на тренировку`,
    [NoticeCategory.WorkoutInviteRejected]: (name: string) => `${name} отклонил приглашение на совместную тренировку`,
  },
  [UserGender.Female]: {
    [NoticeCategory.NewFriend]: (name: string) => `${name} добавила вас в друзья.`,
    [NoticeCategory.WorkoutInviteAccepted]: (name: string) => `${name} приняла приглашение на совместную тренировку.`,
    [NoticeCategory.WorkoutInviteRecieved]: (name: string) => `${name} пригласила вас на тренировку`,
    [NoticeCategory.WorkoutInviteRejected]: (name: string) => `${name} отклонила приглашение на совместную тренировку`,
  }
}

export class NoticeListRdo implements Notice {
  public senderId: string;
  public senderName: string;
  public senderGender: UserGender;
  public recipientId: string;
  public category: NoticeCategory;
  public createdAt: Date;

  @Expose()
  public id: string;

  @Expose()
  @Transform(({ obj }) => Message[obj?.senderGender][obj?.category](obj?.senderName))
  public noticeText: string;

  @Expose()
  @Transform(({ obj }) => obj.createdAt)
  date: Date;
}
