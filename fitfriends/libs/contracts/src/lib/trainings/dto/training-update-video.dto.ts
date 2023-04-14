import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TrainingApi } from '../training.api';

export class TrainingUpdateVideoDto extends PickType(TrainingApi, [
  'id',
  'video',
  'authorId',
]) {
  @IsOptional()
  public id: number;

  @IsOptional()
  public authorId: string;
}
