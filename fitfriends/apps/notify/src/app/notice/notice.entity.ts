import { Entity, Notice, NoticeCategory, UserGender } from '@fitfriends/shared-types';

export class NoticeEntity implements Entity<NoticeEntity>, Notice {
  public id: string;
  public senderId: string;
  public senderName: string;
  public senderGender: UserGender;
  public recipientId: string;
  public category: NoticeCategory;
  public createdAt?: Date;

  constructor(notice: Notice) {
    this.fillEntity(notice);
  }

  public toObject(): NoticeEntity {
    return { ...this };
  }

  public fillEntity(entity: Notice) {
    this.id = entity.id;
    this.senderId = entity.senderId;
    this.senderName = entity.senderName;
    this.senderGender = entity.senderGender;
    this.recipientId = entity.recipientId;
    this.category = entity.category;
    this.createdAt = entity.createdAt;
  }
}
