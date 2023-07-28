import { WorkoutInvite, WorkoutInviteStatus } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WORKOUT_INVITE_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: WORKOUT_INVITE_COLLECTION_NAME,
  id: true,
  timestamps: true
})
export class WorkoutInviteModel extends Document implements WorkoutInvite {
  @Prop({
    required: true,
  })
  public authorId: string;

  @Prop({
    required: true,
  })
  public inviteeId: string;

  @Prop({
    required: true,
    type: String,
    enum:WorkoutInviteStatus,
  })
  public status: WorkoutInviteStatus;
}

export const WorkoutInviteSchema = SchemaFactory.createForClass(WorkoutInviteModel);
