import { ProductType, SubwayStation, TrainingType } from '@fitfriends/shared-types';
import { Expose, Transform } from 'class-transformer';

export class OrderCustomerListRdo {
  @Expose()
  public id: number;

  @Expose()
  public productType: ProductType;

  @Expose()
  public amount: number;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public image: string;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public type: TrainingType;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public rating: number;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public caloriesLoss: number;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public location: SubwayStation;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public isVerified: boolean;

  @Expose()
  @Transform(({value}) => (value === null) ? undefined : value)
  public isFavorite: boolean;
}
