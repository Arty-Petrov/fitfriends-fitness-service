import { IsArray, IsBoolean, IsDateString, IsEmail, IsEnum, IsMongoId, IsNumber, IsString, Length, Matches, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  DEFAULT_PAGINATION_COUNT,
  DEFAULT_SORT_ORDER,
  DEFAULT_USERS_COUNT_LIMIT,
  NAME_REGEXP,
  UserApiDescription,
  UserApiError,
  UserAwardsLength,
  UserCaloriesConsumption,
  UserCaloriesLoss,
  UserNameLength,
  UserPasswordLength,
} from './user.constant';
import { SortOrder, SubwayStation, TrainingDuration, TrainingType, User, UserExpirience, UserGender, UserRole } from '@fitfriends/shared-types';
import { InputExample } from '../input-examples.constant';
import { Transform } from 'class-transformer';

export class UserApi implements User {
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
  @Matches(NAME_REGEXP, {
    message: UserApiError.NameNotValid,
  })
  @Length(UserNameLength.Min, UserNameLength.Max)
  public name: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Email,
    example: InputExample.Email,
  })
  @IsEmail()
  public email: string;

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
  public password: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CurrentPassword,
    example: InputExample.Password,
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserApiError.PasswordNotValid,
  })
  public currentPassword: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.PasswordUpdate,
    example: InputExample.Password,
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: UserApiError.PasswordNotValid,
  })
  public updatePassword: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Gender,
  })
  @IsEnum(UserGender, {
    message: UserApiError.GenderIsWrong,
  })
  public gender: UserGender;

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
  public role: UserRole;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Location,
  })
  @IsEnum(SubwayStation, {
    message: UserApiError.LocationIsWrong,
  })
  public location: SubwayStation;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CreatedAt,
    example: InputExample.Date,
  })
  public createdAt: Date;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Expirience,
  })
  @IsEnum(UserExpirience, {
    message: UserApiError.ExpirienceIsWrong,
  })
  public expirience: UserExpirience;

  @ApiProperty({
    required: true,
    description: UserApiDescription.TraningType,
  })
  @IsArray()
  @IsEnum(TrainingType, {
    each: true,
    message: UserApiError.TrainingTypeIsWrong,
  })
  public traningType: TrainingType[];

  @ApiProperty({
    required: true,
    description: UserApiDescription.TrainingDuration,
  })
  @IsEnum(TrainingDuration, {
    message: UserApiError.TrainingDurationIsWrong,
  })
  public trainingDuration: TrainingDuration;

  @ApiProperty({
    required: true,
    description: UserApiDescription.CaloriesLoss,
    example: InputExample.Calories,
  })
  @IsNumber()
  @Min(UserCaloriesLoss.Min)
  @Max(UserCaloriesLoss.Max)
  @Transform(({ value }) => +value)
  public caloriesLoss: number;

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
    description: UserApiDescription.Sertificate,
    example: InputExample.SertificateUrl,
  })
  @IsString()
  public sertificate: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.Awards,
    example: InputExample.Text,
  })
  @IsString()
  @Length(UserAwardsLength.Min, UserAwardsLength.Max)
  public awards: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.IsPersonalTrainer,
    example: InputExample.Boolean,
  })
  @IsBoolean()
  public isPersonalTrainer: boolean;

  @ApiProperty({
    required: true,
    description: UserApiDescription.AccessToken,
    example: InputExample.Token,
  })
  @IsString()
  public accessToken: string;

  @ApiProperty({
    required: true,
    description: UserApiDescription.RefreshToken,
    example: InputExample.Token,
  })
  @IsString()
  public refreshToken: string;

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
    return value < DEFAULT_USERS_COUNT_LIMIT ? value : DEFAULT_USERS_COUNT_LIMIT;
  })
  public count: number = DEFAULT_USERS_COUNT_LIMIT;
}
