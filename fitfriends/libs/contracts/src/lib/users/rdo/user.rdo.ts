import { SubwayStation, TrainingDuration as TrainingDuration, TrainingType, UserExpirience, UserGender, UserRole } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserRdo extends PickType(UserApi, [
  'name',
  'email',
  'avatar',
  'gender',
  'dateBirth',
  'role',
  'location',
  'expirience',
  'createdAt',
  'traningType',
  'trainingDuration',
  'caloriesLoss',
  'caloriesConsumption',
  'isReadyForInvite',
  'sertificate',
  'awards',
  'isPersonalTrainer',
]) {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public dateBirth: Date;

  @Expose()
  public role: UserRole;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public expirience: UserExpirience;

  @Expose()
  public createdAt: Date;

  @Expose()
  public traningType: TrainingType[];

  @Expose()
  public trainingDuration: TrainingDuration;

  @Expose()
  public caloriesLoss: number;

  @Expose()
  public caloriesConsumption: number;

  @Expose()
  public isReadyForInvite: boolean;

  @Expose()
  public sertificate: string;

  @Expose()
  public awards: string;

  @Expose()
  public isPersonalTrainer: boolean;
}
