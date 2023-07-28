import { PickType } from '@nestjs/swagger';
import { PublicationApi } from '../publication.api';

export class PublicationCreateDto extends PickType(PublicationApi, [
  'authorId',
  'category',
  'entityId',
  'title',
  'description',
]) {}
