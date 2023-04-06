import {
  SortOrder,
  TrainingDuration,
  TrainingRatingRange,
  TrainingSortType,
  TrainingType,
} from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_TRAININGS_COUNT_LIMIT,
  DEFAULT_TRAININGS_PAGINATION_COUNT,
  DEFAULT_TRAININGS_SORT_ORDER,
  TrainingCaloriesLoss,
  TrainingPriceRange,
} from '../training.constant';

export class TrainingMyListQuery {
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

  @Transform(({ value }) => (value === SortOrder.Ascended ? 1 : -1))
  @IsIn([1, -1])
  @IsOptional()
  public sortCreation?: 1 | -1 = DEFAULT_TRAININGS_SORT_ORDER;

  @IsEnum(TrainingSortType)
  @IsOptional()
  public sortBy?: TrainingSortType;

  @Transform(({ value }) =>
    (Math.abs(+value) < TrainingPriceRange.Max) ? Math.abs(+value) : TrainingPriceRange.Min
  )
  @IsNumber()
  @IsOptional()
  public priceMin?: number;

  @Transform(({ value }) =>
    (Math.abs(+value) > TrainingPriceRange.Min) ? Math.abs(+value) : TrainingPriceRange.Max
  )
  @IsNumber()
  @IsOptional()
  public priceMax?: number;

  @Transform(({ value }) =>
    (Math.abs(+value) < TrainingCaloriesLoss.Max) ? Math.abs(+value) : TrainingCaloriesLoss.Min
  )
  @IsNumber()
  @IsOptional()
  public caloriesMin?: number;

  @Transform(({ value }) =>
    (Math.abs(+value) > TrainingCaloriesLoss.Min) ? Math.abs(+value) : TrainingCaloriesLoss.Max
  )
  @IsNumber()
  @IsOptional()
  public caloriesMax?: number;

  @Transform(({ value }) =>
    (Math.abs(+value) < TrainingRatingRange.Max) ? Math.abs(+value) : TrainingRatingRange.Min
  )
  @IsNumber()
  @IsOptional()
  public ratingMin?: number[];

  @Transform(({ value }) =>
    (Math.abs(+value) > TrainingRatingRange.Min) ? Math.abs(+value) : TrainingRatingRange.Max
  )
  @IsNumber()
  @IsOptional()
  public ratingMax?: number[];

  @IsEnum(TrainingType, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsArray()
  @IsEnum(TrainingDuration, {
    each: true,
  })
  @IsOptional()
  public durations?: TrainingType[];

  public authorId: string;
}
