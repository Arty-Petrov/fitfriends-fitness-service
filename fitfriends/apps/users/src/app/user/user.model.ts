import { SubwayStation, TrainingDuration, TrainingType, User, UserExperience, UserGender, UserRole } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USERS_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: USERS_COLLECTION_NAME,
  id: true,
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public avatar?: string;

  @Prop({
    required: true,
  })
  public passwordHash?: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender,
  })
  public gender: UserGender;

  @Prop({
    required: true,
  })
  public dateBirth?: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
  })
  public role: UserRole;

  @Prop({
    required: true,
    type: String,
    enum: SubwayStation,
  })
  public subwayStation: SubwayStation;

  @Prop({
    required: true,
    type: String,
    enum: UserExperience,
  })
  public experience: UserExperience;

  @Prop({
    required: true,
    type: [String],
  })
  public trainingTypes: TrainingType[];

  @Prop({
    required: true,
    type: String,
    enum: TrainingDuration,
  })
  public trainingDuration: TrainingDuration;

  @Prop({
    required: true,
  })
  public caloriesLoss: number;

  @Prop({
    required: true,
  })
  public caloriesConsumption?: number;

  @Prop({
    required: true,
    default: null,
  })
  public isReadyForInvite?: boolean | null;

  @Prop({
    required: true,
  })
  public certificate: string;

  @Prop({
    required: true,
  })
  public awards: string;

  @Prop({
    required: true,
    default: null,
  })
  public isPersonalTrainer: boolean | null;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
