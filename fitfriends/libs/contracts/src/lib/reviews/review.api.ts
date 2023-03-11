import { SortOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, IsString, Length, Max } from 'class-validator';
import {
  DEFAULT_REVIEWS_COUNT_LIMIT,
  DEFAULT_REVIEWS_PAGINATION_COUNT,
  DEFAULT_REVIEWS_SORT_ORDER,
  ReviewApiDescription,
  ReviewApiError,
  ReviewEvaluationRange,
  ReviewTextLength,
} from './review.constant';

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

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_REVIEWS_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_REVIEWS_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_REVIEWS_COUNT_LIMIT ? value : DEFAULT_REVIEWS_COUNT_LIMIT;
  })
  public count: number = DEFAULT_REVIEWS_COUNT_LIMIT;
}
