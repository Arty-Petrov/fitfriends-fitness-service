import { OrderStatus, TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingApi } from '../training.api';

export class TrainingCardRdo extends PickType(TrainingApi, [
  'id',
  'title',
  'image',
  'experience',
  'type',
  'duration',
  'price',
  'caloriesLoss',
  'description',
  'gender',
  'video',
  'rating',
  'authorId',
  'isSpecialOffer',
]) {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public image: string;

  @Expose()
  public experience: UserExperience;

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
  public authorId: string;

  @Expose()
  public isSpecialOffer: boolean;

  @Expose()
  public orderId: number;

  @Expose()
  public status?: Exclude<OrderStatus | null, OrderStatus.Expired | OrderStatus.Finished>;
}
