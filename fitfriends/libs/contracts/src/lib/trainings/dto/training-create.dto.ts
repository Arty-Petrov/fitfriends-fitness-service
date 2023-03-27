import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TrainingApi } from '../training.api';

export class TrainingCreateDto extends PickType(TrainingApi, [
  'name',
  'image',
  'experience',
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
    required: true,
  })
  @IsOptional()
  public price: number;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  public isSpecialOffer = false;
}
