import { SubwayStation, TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserApi } from '../user.api';

export class UserUpdateDataDto extends PickType(UserApi, [
  'name',
  'gender',
  'subwayStation',
  'experience',
  'trainingTypes',
  'trainingDuration',
  'caloriesLoss',
  'caloriesConsumption',
  'isReadyForInvite',
  'awards',
  'isPersonalTrainer',
]) {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public gender: UserGender;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public location: SubwayStation;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public experience: UserExperience;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public trainingTypes: TrainingType[];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public trainingDuration: TrainingDuration;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public caloriesLoss: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public caloriesConsumption: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isReadyForInvite: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public awards: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isPersonalTrainer: boolean;
}
