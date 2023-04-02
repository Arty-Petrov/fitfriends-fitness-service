import { ConditionalMaxLength } from '@fitfriends/core';
import { SortOrder, SubwayStation, TrainingDuration, TrainingType, User, UserExperience, UserGender, UserRole } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNumber, IsString, Length, Matches, Max, Min } from 'class-validator';
import { InputExample } from '../input-examples.constant';
import {
  DEFAULT_USERS_COUNT_LIMIT, DEFAULT_USERS_PAGINATION_COUNT,
  DEFAULT_USERS_SORT_ORDER, UserApiDescription,
  UserApiError,
  UserAwardsLength,
  UserCaloriesConsumption,
  UserCaloriesLoss,
  UserNameLength,
  UserPasswordLength, USER_NAME_REGEXP
} from './user.constant';

export class UserApi {
  @ApiProperty({
    required: true,
    description: UserApiDescription.Id,
    example: InputExample.MongoId,
  })
  @IsMongoId()
  public id?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Name,
    example: InputExample.Name,
  })
  @IsString()
  @Matches(USER_NAME_REGEXP, {
    message: UserApiError.NameNotValid,
  })
  @Length(UserNameLength.Min, UserNameLength.Max)
  public name?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Email,
    example: InputExample.Email,
  })
  @IsEmail()
  public email?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Avatar,
    example: InputExample.PictureUrl,
  })
  @IsString()
  public avatar?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Password,
    example: InputExample.Password,
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserApiError.PasswordNotValid,
  })
  public password?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Gender,
  })
  @IsEnum(UserGender, {
    message: UserApiError.GenderIsWrong,
  })
  public gender?: UserGender;

  @ApiProperty({
    required: true,
    description: UserApiDescription.DateBirth,
    example: InputExample.Date,
  })
  @IsDateString()
  public dateBirth?: Date;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Role,
  })
  @IsEnum(UserRole, {
    message: UserApiError.RoleIsWrong,
  })
  public role?: UserRole;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Location,
  })
  @IsEnum(SubwayStation, {
    message: UserApiError.LocationIsWrong,
  })
  public subwayStation?: SubwayStation;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CreatedAt,
    example: InputExample.Date,
  })
  public createdAt?: Date;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Experience,
  })
  @IsEnum(UserExperience, {
    message: UserApiError.ExperienceIsWrong,
  })
  public experience?: UserExperience;

  @ApiProperty({
    required: true,
    description: UserApiDescription.TrainingType,
  })
  @IsArray()
  @ConditionalMaxLength('role', [
    {value: UserRole.Customer, maxLength: 1},
    {value: UserRole.Coach, maxLength: 3},
  ],
  {
      message: UserApiError.RoleIsWrong,
    }
  )
  @IsEnum(TrainingType, {
    each: true,
    message: UserApiError.TrainingTypeIsWrong,
  })
  public trainingTypes?: TrainingType[];

  @ApiProperty({
    required: true,
    description: UserApiDescription.TrainingDuration,
  })
  @IsEnum(TrainingDuration, {
    message: UserApiError.TrainingDurationIsWrong,
  })
  public trainingDuration?: TrainingDuration;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CaloriesLoss,
    example: InputExample.Calories,
  })
  @IsNumber()
  @Min(UserCaloriesLoss.Min)
  @Max(UserCaloriesLoss.Max)
  @Transform(({ value }) => +value)
  public caloriesLoss?: number;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CaloriesConsumption,
    example: InputExample.Calories,
  })
  @IsNumber()
  @Min(UserCaloriesConsumption.Min)
  @Max(UserCaloriesConsumption.Max)
  @Transform(({ value }) => +value)
  public caloriesConsumption?: number;

  @ApiProperty({
    required: true,
    description: UserApiDescription.IsReadyForInvite,
    example: InputExample.Boolean,
  })
  @IsBoolean()
  public isReadyForInvite?: boolean;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Certificate,
    example: InputExample.SertificateUrl,
  })
  @IsString()
  public certificate?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Awards,
    example: InputExample.Text,
  })
  @IsString()
  @Length(UserAwardsLength.Min, UserAwardsLength.Max)
  public awards?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.IsPersonalCoach,
    example: InputExample.Boolean,
  })
  @IsBoolean()
  public isPersonalCoach?: boolean;

  @ApiProperty({
    required: true,
    description: UserApiDescription.AccessToken,
    example: InputExample.Token,
  })
  @IsString()
  public accessToken?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.RefreshToken,
    example: InputExample.Token,
  })
  @IsString()
  public refreshToken?: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.RefreshTokenId,
    example: InputExample.MongoId,
  })
  @IsString()
  public refreshTokenId?: string;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_USERS_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_USERS_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_USERS_COUNT_LIMIT ? value : DEFAULT_USERS_COUNT_LIMIT;
  })
  public count: number = DEFAULT_USERS_COUNT_LIMIT;
}
