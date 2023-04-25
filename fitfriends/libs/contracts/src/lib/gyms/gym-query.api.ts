import { GymFeature, SortOrder, SubwayStation } from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import { DEFAULT_GYM_COUNT_LIMIT, DEFAULT_GYM_PAGINATION_COUNT, DEFAULT_GYM_SORT_ORDER } from './gym.constant';

export class GymQueryApi {
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_GYM_PAGINATION_COUNT
  )
  @IsOptional()
  public page?: number;

  @IsNumber()
  @Max(DEFAULT_GYM_COUNT_LIMIT)
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_GYM_COUNT_LIMIT
  )
  @IsOptional()
  public count?: number = DEFAULT_GYM_COUNT_LIMIT;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortCreation?: SortOrder = DEFAULT_GYM_SORT_ORDER;

  @Transform(({ value }) => Math.abs(+value))
  @IsNumber()
  @IsOptional()
  public priceMin?: number;

  @Transform(({ value }) => Math.abs(+value))
  @IsNumber()
  @IsOptional()
  public priceMax?: number;

  @IsEnum(SubwayStation, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsArray()
  @IsEnum(SubwayStation, {
    each: true,
  })
  @IsOptional()
  public locations?: SubwayStation[];

  @IsEnum(GymFeature, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsArray()
  @IsEnum(GymFeature, {
    each: true,
  })
  @IsOptional()
  public features?: GymFeature[];

  @Transform(({value}) => JSON.parse(value))
  @IsBoolean()
  @IsOptional()
  public isVerified: boolean;
}
