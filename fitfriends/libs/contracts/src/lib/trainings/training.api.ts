import { SortOrder, Training, TrainingDuration, TrainingType, UserExpirience, UserGender } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsMongoId, IsString, Length, Min, Max, IsBoolean } from 'class-validator';
import {
  TrainingApiDescription,
  TrainingApiError,
  TrainingCaloriesLoss,
  TrainingDescriptionLength,
  TrainingNameLength,
  TrainingPriceRange,
  DEFAULT_SORT_ORDER,
  DEFAULT_PAGINATION_COUNT,
  DEFAULT_TRAINIGS_COUNT_LIMIT,
} from './training.constant';

export class TrainingApi implements Training {
  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Id,
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Name,
  })
  @IsString()
  @Length(TrainingNameLength.Min, TrainingNameLength.Max, {
    message: TrainingApiError.NameNotValid,
  })
  public name: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.BackgroundImage,
  })
  @IsString()
  public backgroundImageUri: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Expirience,
  })
  @IsEnum(UserExpirience, {
    message: TrainingApiError.ExpirienceIsWrong,
  })
  public expirience: UserExpirience;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Type,
  })
  @IsEnum(TrainingType, {
    message: TrainingApiError.TypeIsWrong,
  })
  public type: TrainingType;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Duration,
  })
  @IsEnum(TrainingDuration, {
    message: TrainingApiError.DurationIsWrong,
  })
  public duration: TrainingDuration;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Price,
  })
  @IsNumber()
  @Min(TrainingPriceRange.Min)
  @Max(TrainingPriceRange.Max)
  public price: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.CaloriesLoss,
  })
  @IsNumber()
  @Min(TrainingCaloriesLoss.Min)
  @Max(TrainingCaloriesLoss.Max)
  public caloriesLoss: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Description,
  })
  @IsString()
  @Length(TrainingDescriptionLength.Min, TrainingDescriptionLength.Max, {
    message: TrainingApiError.DescriptionNotValid,
  })
  public description: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Gender,
  })
  @IsEnum(UserGender, {
    message: TrainingApiError.GenderIsWrong,
  })
  public gender: UserGender;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Video,
  })
  @IsString()
  public video: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.TrainerId,
  })
  @IsMongoId()
  public trainerId: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.IsSpecialOffer,
  })
  @IsBoolean()
  public isSpecialOffer: boolean;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.PriceMin,
  })
  @Transform(({ value }) => +value)
  public priceMin: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.PriceMax,
  })
  @Transform(({ value }) => +value)
  public priceMax: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.CaloriesMin,
  })
  @Transform(({ value }) => +value)
  public caloriesMin: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.CaloriesMax,
  })
  @Transform(({ value }) => +value)
  public caloriesMax: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Rating,
  })
  @Transform(({ value }) => +value)
  public rating: number;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_TRAINIGS_COUNT_LIMIT ? value : DEFAULT_TRAINIGS_COUNT_LIMIT;
  })
  public count: number = DEFAULT_TRAINIGS_COUNT_LIMIT;
}
