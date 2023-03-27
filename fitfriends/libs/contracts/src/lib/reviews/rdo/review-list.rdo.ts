import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ReviewApi } from '../review.api';

export class ReviewListRdo extends PickType(ReviewApi, ['id', 'trainingId', 'authorId', 'text', 'evaluation', 'createdAt']) {
  @Expose()
  public id: number;

  @Expose()
  public trainingId: number;

  @Expose()
  public authorId: string;

  @Expose()
  public text: string;

  @Expose()
  public evaluation: number;

  @Expose()
  public createdAt?: Date;
}
