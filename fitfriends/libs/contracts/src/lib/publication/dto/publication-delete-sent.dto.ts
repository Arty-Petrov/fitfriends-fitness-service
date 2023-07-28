import { PickType } from '@nestjs/swagger';
import { PublicationApi } from '../publication.api';

export class PublicationDeleteSentDto extends PickType(PublicationApi, [
  'id',
  'authorId',
  'category',
  'entityId',
  'title',
  'description',
]) {}
