import { GymFeature, SubwayStation } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GymApi } from '../gym.api';

export class GymRdo extends PickType(GymApi, ['id', 'name', 'location', 'isVerifyed', 'features', 'photos', 'description', 'price', 'createdAt']) {
  @Expose()
  public id: number;

  @Expose()
  public name: string;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public isVerifyed: boolean;

  @Expose()
  public features: GymFeature[];

  @Expose()
  public photos: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public createdAt: Date;
}
