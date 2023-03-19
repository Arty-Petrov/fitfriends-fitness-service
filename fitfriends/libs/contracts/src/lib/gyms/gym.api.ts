import { Gym, GymFeature, SortOrder, SubwayStation } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBooleanString, IsEnum, IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import {
  DEFAULT_GYM_COUNT_LIMIT,
  DEFAULT_GYM_PAGINATION_COUNT,
  DEFAULT_GYM_SORT_ORDER,
  GymApiDescription,
  GymApiError,
  GymNameLength,
  GymPhotosSize,
  GymPriceRange,
} from './gym.constant';

export class GymApi implements Gym {
  @ApiProperty({
    required: true,
    description: GymApiDescription.Id,
  })
  @IsMongoId()
  public id: number;

  @ApiProperty({
    required: true,
    description: GymApiDescription.Name,
  })
  @IsString()
  @Length(GymNameLength.Min, GymNameLength.Max, {
    message: GymApiError.NameNotValid,
  })
  public name: string;

  @ApiProperty({
    required: true,
    description: GymApiDescription.Location,
  })
  @IsEnum(SubwayStation, {
    message: GymApiError.LocationIsWrong,
  })
  public location: SubwayStation;

  @ApiProperty({
    required: true,
    description: GymApiDescription.IsVeryfied,
  })
  @IsBooleanString()
  public isVerified: boolean;

  @ApiProperty({
    required: true,
    description: GymApiDescription.Features,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(SubwayStation, {
    each: true,
    message: GymApiError.LocationIsWrong,
  })
  public features: GymFeature[];

  @ApiProperty({
    required: true,
    description: GymApiDescription.Photos,
  })
  @IsArray()
  @ArrayNotEmpty({
    message: GymApiError.PhotosSizeIsWrong,
  })
  @ArrayMaxSize(GymPhotosSize.Max, {
    message: GymApiError.PhotosSizeIsWrong,
  })
  @IsString({
    each: true,
  })
  public photos: string[];

  @ApiProperty({
    required: true,
    description: GymApiDescription.Id,
  })
  public description: string;

  @ApiProperty({
    required: true,
    description: GymApiDescription.Price,
  })
  @IsNumber()
  @Min(GymPriceRange.Min)
  @Max(GymPriceRange.Max)
  public price: number;

  @ApiProperty({
    required: true,
  })
  public createdAt: Date;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_GYM_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_GYM_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_GYM_COUNT_LIMIT ? value : DEFAULT_GYM_COUNT_LIMIT;
  })
  public count: number = DEFAULT_GYM_COUNT_LIMIT;
}
