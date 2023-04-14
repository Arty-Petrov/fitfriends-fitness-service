import { SortOrder } from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import {
  DEFAULT_REVIEWS_COUNT_LIMIT,
  DEFAULT_REVIEWS_PAGINATION_COUNT,
  DEFAULT_REVIEWS_SORT_ORDER,
} from './review.constant';

export class ReviewQueryApi {
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_REVIEWS_PAGINATION_COUNT
  )
  @IsOptional()
  public page?: number;

  @IsNumber()
  @Max(DEFAULT_REVIEWS_COUNT_LIMIT)
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_REVIEWS_COUNT_LIMIT
  )
  @IsOptional()
  public count?: number = DEFAULT_REVIEWS_COUNT_LIMIT;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortCreation?: SortOrder = DEFAULT_REVIEWS_SORT_ORDER;

  @Transform(({ value }) => Math.abs(+value))
  @IsNumber()
  @IsOptional()
  public trainingId?: number;
}
