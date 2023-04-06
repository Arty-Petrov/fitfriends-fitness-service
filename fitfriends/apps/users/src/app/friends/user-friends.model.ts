import { UserFriends } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_FRIENDS_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: USER_FRIENDS_COLLECTION_NAME,
  id: true,
})
export class UserFriendsModel extends Document implements UserFriends {
  @Prop({
    required: true,
    unique: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public friendIds: string[];
}

export const UserFriendsSchema = SchemaFactory.createForClass(UserFriendsModel);
