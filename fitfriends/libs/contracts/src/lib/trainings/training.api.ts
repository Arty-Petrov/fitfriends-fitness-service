import { TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import {
  TrainingApiDescription,
  TrainingApiError,
  TrainingCaloriesLoss,
  TrainingDescriptionLength,
  TrainingTitleLength,
} from './training.constant';

export class TrainingApi {
  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Id,
  })
  @IsNumber()
  public id?: number;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Title,
  })
  @IsString()
  @Length(TrainingTitleLength.Min, TrainingTitleLength.Max, {
    message: TrainingApiError.NameNotValid,
  })
  public title?: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Image,
  })
  @IsString()
  public image?: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Experience,
  })
  @IsEnum(UserExperience, {
    message: TrainingApiError.ExperienceIsWrong,
  })
  public experience?: UserExperience;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Type,
  })
  @IsEnum(TrainingType, {
    message: TrainingApiError.TypeIsWrong,
  })
  public type?: TrainingType;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Duration,
  })
  @IsEnum(TrainingDuration, {
    message: TrainingApiError.DurationIsWrong,
  })
  public duration?: TrainingDuration;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Price,
  })
  @IsNumber()
  @IsPositive()
  public price?: number;

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
  public description?: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Gender,
  })
  @IsEnum(UserGender, {
    message: TrainingApiError.GenderIsWrong,
  })
  public gender?: UserGender;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Video,
  })
  @IsString()
  public video?: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.AuthorId,
  })
  @IsMongoId()
  public authorId?: string;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.IsSpecialOffer,
  })
  @IsBoolean()
  public isSpecialOffer?: boolean;

  @ApiProperty({
    required: true,
    description: TrainingApiDescription.Rating,
  })
  @Transform(({ value }) => +value)
  public rating?: number;
}
