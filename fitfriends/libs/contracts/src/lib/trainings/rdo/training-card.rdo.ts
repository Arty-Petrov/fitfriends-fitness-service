import { TrainingDuration, TrainingType, UserExpirience, UserGender } from '@fitfriends/shared-types';
import { Expose } from 'class-transformer';

export class TrainingCardRdo extends PickType(TrainingApi, [
  'id',
  'name',
  'backgroundImageUri',
  'expirience',
  'type',
  'duration',
  'price',
  'caloriesLoss',
  'description',
  'gender',
  'video',
  'rating',
  'trainerId',
  'isSpecialOffer',
]) {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public backgroundImageUri: string;

  @Expose()
  public expirience: UserExpirience;

  @Expose()
  public type: TrainingType;

  @Expose()
  public duration: TrainingDuration;

  @Expose()
  public price: number;

  @Expose()
  public caloriesLoss: number;

  @Expose()
  public description: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public video: string;

  @Expose()
  public rating: number;

  @Expose()
  public trainerId: string;

  @Expose()
  public isSpecialOffer: boolean;
}
