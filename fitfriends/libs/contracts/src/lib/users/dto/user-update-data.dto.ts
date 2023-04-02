import {
  SubwayStation,
  TrainingDuration,
  TrainingType,
  UserExperience,
  UserGender,
  UserRole,
} from '@fitfriends/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, ValidateIf } from 'class-validator';
import { UserApi } from '../user.api';

export class UserUpdateDataDto extends PickType(UserApi, [
  'id',
  'name',
  'avatar',
  'gender',
  'dateBirth',
  'role',
  'subwayStation',
  'experience',
  'trainingTypes',
  'trainingDuration',
  'caloriesLoss',
  'caloriesConsumption',
  'isReadyForInvite',
  'certificate',
  'awards',
  'isPersonalCoach',
]) {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public avatar?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public dateBirth?: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public role?: UserRole;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public subwayStation?: SubwayStation;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public experience?: UserExperience;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public trainingTypes?: TrainingType[];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Customer)
  public trainingDuration?: TrainingDuration;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Customer)
  public caloriesLoss?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Customer)
  public caloriesConsumption?: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Customer)
  public isReadyForInvite?: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Coach)
  public certificate?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Coach)
  public awards?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateIf((data) => data?.role === UserRole.Coach)
  public isPersonalCoach?: boolean;
}
