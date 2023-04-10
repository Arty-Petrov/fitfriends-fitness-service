import {
  SortOrder,
  TrainingDuration,
  TrainingPriceSortType,
  TrainingRatingRange,
  TrainingType,
} from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_TRAININGS_COUNT_LIMIT,
  DEFAULT_TRAININGS_PAGINATION_COUNT,
  DEFAULT_TRAININGS_SORT_ORDER,
  TrainingCaloriesLoss,
} from '../training.constant';

export class TrainingListQuery {
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_TRAININGS_PAGINATION_COUNT
  )
  @IsOptional()
  public page?: number;

  @IsNumber()
  @Max(50)
  @Min(1)
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_TRAININGS_COUNT_LIMIT
  )
  @IsOptional()
  public count?: number = DEFAULT_TRAININGS_COUNT_LIMIT;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortCreation?: SortOrder = DEFAULT_TRAININGS_SORT_ORDER;

  @IsEnum(TrainingPriceSortType)
  @IsOptional()
  public sortPrice?: TrainingPriceSortType;

  @Transform(({ value }) => Math.abs(+value))
  @IsNumber()
  @IsOptional()
  public priceMin?: number;

  @Transform(({ value }) => Math.abs(+value))
  @IsNumber()
  @IsOptional()
  public priceMax?: number;

  @Transform(({ value }) =>
    Math.abs(+value) < TrainingCaloriesLoss.Max
      ? Math.abs(+value)
      : TrainingCaloriesLoss.Min
  )
  @IsNumber()
  @IsOptional()
  public caloriesMin?: number;

  @Transform(({ value }) =>
    Math.abs(+value) > TrainingCaloriesLoss.Min
      ? Math.abs(+value)
      : TrainingCaloriesLoss.Max
  )
  @IsNumber()
  @IsOptional()
  public caloriesMax?: number;

  @Transform(({ value }) =>
    Math.abs(+value) < TrainingRatingRange.Max
      ? Math.abs(+value)
      : TrainingRatingRange.Min
  )
  @IsNumber()
  @IsOptional()
  public ratingMin?: number[];

  @Transform(({ value }) =>
    Math.abs(+value) > TrainingRatingRange.Min
      ? Math.abs(+value)
      : TrainingRatingRange.Max
  )
  @IsNumber()
  @IsOptional()
  public ratingMax?: number[];

  @IsEnum(TrainingType, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsArray()
  @IsEnum(TrainingType, {
    each: true,
  })
  @IsOptional()
  public types?: TrainingType[];

  @IsEnum(TrainingDuration, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsArray()
  @IsEnum(TrainingDuration, {
    each: true,
  })
  @IsOptional()
  public durations?: TrainingDuration[];
}
