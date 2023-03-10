import { TrainingDuration, TrainingType, UserExpirience, UserGender } from '@fitfriends/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TrainingApi } from '../training.api';

export class TrainingUpdateDto extends PickType(TrainingApi, [
  'id',
  'name',
  'backgroundImageUri',
  'expirience',
  'type',
  'duration',
  'price',
  'caloriesLoss',
  'description',
  'gender',
  'video',
  'trainerId',
  'isSpecialOffer',
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
  public backgroundImageUri: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public expirience: UserExpirience;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public type: TrainingType;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public duration: TrainingDuration;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public price: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public caloriesLoss: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public description: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public gender: UserGender;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public video: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public trainerId: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isSpecialOffer: boolean;
}
