import { PickType } from '@nestjs/swagger';
import { TrainingApi } from '../training.api';

export class TrainingCreateDto extends PickType(TrainingApi, [
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
]) { }
