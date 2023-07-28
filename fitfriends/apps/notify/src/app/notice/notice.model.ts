import { Notice, NoticeCategory, UserGender } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NOTICE_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: NOTICE_COLLECTION_NAME,
  id: true,
  timestamps: true,
})
export class NoticeModel extends Document implements  Notice {
  @Prop()
  public senderId: string;

  @Prop()
  public senderName: string;

  @Prop({
    type: String,
    enum: UserGender,
  })
  public senderGender: UserGender;

  @Prop()
  public recipientId: string;

  @Prop({
    type: String,
    enum: NoticeCategory,
  })
  public category: NoticeCategory;
}

export const NoticeSchema = SchemaFactory.createForClass(NoticeModel);
