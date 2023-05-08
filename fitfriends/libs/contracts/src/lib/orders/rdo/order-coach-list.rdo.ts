import {
  PaymentMethod,
  ProductType,
  TrainingDuration,
  TrainingType,
  UserExperience,
  UserGender,
} from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OrderApi } from '../order.api';

export class OrderCoachListRdo extends PickType(OrderApi, [
  'id',
  'authorId',
  'productType',
  'productPrice',
  'amount',
  'totalPrice',
  'paymentMethod',
  'createdAt',
]) {
  @Expose()
  public id: number;

  @Expose()
  public authorId: string;

  @Expose()
  public productType: ProductType;

  @Expose()
  public productId: number;

  @Expose()
  public productPrice: number;

  @Expose()
  public amount: number;

  @Expose()
  public totalPrice?: number;

  @Expose()
  public paymentMethod: PaymentMethod;

  @Expose()
  public createdAt?: Date;

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
  public caloriesLoss: number;

  @Expose()
  public description: string;

  @Expose()
  public gender: UserGender;

  @Expose()
  public video: string;

  @Expose()
  public coachId: string;

  @Expose()
  public isSpecialOffer: boolean;

  @Expose()
  public rating: number;
}
