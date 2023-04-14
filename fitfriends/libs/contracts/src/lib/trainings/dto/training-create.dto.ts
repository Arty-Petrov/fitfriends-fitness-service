import { TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';
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
  public title: string;

  public image: string;
  
  public experience: UserExperience;
  
  public type: TrainingType;
  
  public duration: TrainingDuration;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public price: number;
  
  public caloriesLoss: number;
  
  public description: string;
  
  public gender: UserGender;
  
  public video: string;
  
  public authorId: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isSpecialOffer= false;
}
