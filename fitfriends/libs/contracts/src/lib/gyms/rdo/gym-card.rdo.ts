import { GymFeature, SubwayStation } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GymApi } from '../gym.api';

export class GymCardRdo extends PickType(GymApi, [
  'id',
  'title',
  'location',
  'isVerified',
  'features',
  'photos',
  'description',
  'price',
  'isFavorite',
  'createdAt',
]) {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public features: GymFeature[];

  @Expose()
  public photos: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public createdAt: Date;
}
