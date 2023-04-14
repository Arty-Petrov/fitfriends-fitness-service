import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TrainingApi } from '../training.api';

export class TrainingUpdateImageDto extends PickType(TrainingApi, [
  'id',
  'image',
  'authorId',
]) {
  @IsOptional()
  public id: number;

  @IsOptional()
  public authorId: string;
}
