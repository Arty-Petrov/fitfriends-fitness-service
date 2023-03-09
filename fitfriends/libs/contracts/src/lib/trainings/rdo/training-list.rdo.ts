import { TrainingType } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingApi } from '../training.api';

export class TrainingListRdo extends PickType(TrainingApi, ['id', 'name', 'backgroundImageUri', 'type', 'price', 'caloriesLoss', 'description', 'rating', 'isSpecialOffer']) {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public backgroundImageUri: string;

  @Expose()
  public type: TrainingType;

  @Expose()
  public price: number;

  @Expose()
  public caloriesLoss: number;

  @Expose()
  public description: string;

  @Expose()
  public rating: number;

  @Expose()
  public isSpecialOffer: boolean;
}
