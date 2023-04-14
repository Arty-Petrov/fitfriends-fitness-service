import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { ReviewApiDescription, ReviewApiError, ReviewEvaluationRange, ReviewTextLength } from './review.constant';

export class ReviewApi {
  @ApiProperty({
    required: true,
    description: ReviewApiDescription.Id,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    required: true,
    description: ReviewApiDescription.TrainingId,
  })
  @IsNumber()
  trainingId: number;

  @ApiProperty({
    required: true,
    description: ReviewApiDescription.AuthorId,
  })
  @IsMongoId()
  authorId: string;

  @ApiProperty({
    required: true,
    description: ReviewApiDescription.Text,
  })
  @IsString()
  @Length(ReviewTextLength.Min, ReviewTextLength.Max, {
    message: ReviewApiError.TextIsNotValid,
  })
  text: string;

  @ApiProperty({
    required: true,
    description: ReviewApiDescription.Evaluation,
  })
  @IsNumber()
  @Min(ReviewEvaluationRange.Min)
  @Max(ReviewEvaluationRange.Max)
  evaluation: number;

  @ApiProperty({
    required: true,
    description: ReviewApiDescription.CreatedAt,
  })
  createdAt?: Date;
}
