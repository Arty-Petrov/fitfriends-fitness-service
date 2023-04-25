import { Gym, GymFeature, SubwayStation } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { GymApiDescription, GymApiError, GymPhotosSize, GymPriceRange, GymTitleLength } from './gym.constant';

export class GymApi implements Gym {
  @ApiProperty({
    required: true,
    description: GymApiDescription.Id,
  })
  @IsMongoId()
  public id: number;

  @ApiProperty({
    required: true,
    description: GymApiDescription.Title,
  })
  @IsString()
  @Length(GymTitleLength.Min, GymTitleLength.Max, {
    message: GymApiError.TitleNotValid,
  })
  public title: string;

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
}
