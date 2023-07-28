import { PublicationCategory } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';
import { PublicationApiDescription, PublicationApiError } from './publication.constant';

export class PublicationApi {
  @ApiProperty({
    required: true,
    description: PublicationApiDescription.Id,
  })
  @IsMongoId()
  public id?: string;

  @ApiProperty({
    required: true,
    description: PublicationApiDescription.AuthorId,
  })
  @IsMongoId()
  public authorId: string;

  @ApiProperty({
    required: true,
    description: PublicationApiDescription.Category,
  })
  @IsEnum(PublicationCategory, {
    message: PublicationApiError.CategoryIsWrong,
  })
  public category: PublicationCategory;

  @ApiProperty({
    required: true,
    description: PublicationApiDescription.EntityId,
  })
  @IsNumber()
  public entityId: number;

  @ApiProperty({
    required: true,
    description: PublicationApiDescription.Title,
  })
  @IsString()
  public title: string;

  @ApiProperty({
    required: true,
    description: PublicationApiDescription.Description,
  })
  @IsString()
  public description: string;
}
