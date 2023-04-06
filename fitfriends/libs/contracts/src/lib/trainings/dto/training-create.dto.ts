import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TrainingApi } from '../training.api';

export class TrainingCreateDto extends PickType(TrainingApi, [
  'title',
  'image',
  'experience',
  'type',
  'duration',
  'price',
  'caloriesLoss',
  'description',
  'gender',
  'video',
  'authorId',
  'isSpecialOffer',
]) {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public price: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isSpecialOffer= false;
}
