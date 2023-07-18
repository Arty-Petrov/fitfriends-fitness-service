import { Feed } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { FeedApiDescription, FeedApiError, MealOrdinalRange } from './feed.constant';

export class FeedApi implements Feed {
  @ApiProperty({
    required: true,
    description: FeedApiDescription.Id,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    required: true,
    description: FeedApiDescription.Date,
  })
  @IsDate()
  @Transform(({value}) => new Date(value))
  public date: Date;

  @ApiProperty({
    required: true,
    description: FeedApiDescription.MealOrdinal,
  })
  @IsNumber()
  @Min(MealOrdinalRange.Min, {message: FeedApiError.MealOrdinalIsNotValid})
  @Max(MealOrdinalRange.Max, {message: FeedApiError.MealOrdinalIsNotValid})
  public mealOrdinal: number;

  @ApiProperty({
    required: true,
    description: FeedApiDescription.CaloriesGain,
  })
  @IsNumber()
  public caloriesGain: number;

  @ApiProperty({
    required: true,
    description: FeedApiDescription.AuthorId,
  })
  @IsMongoId()
  public authorId: string;
}
