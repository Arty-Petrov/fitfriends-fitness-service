import { PickType } from '@nestjs/swagger';
import { PublicationApi } from '../publication.api';

export class PublicationRdo extends PickType(PublicationApi, [
  'id',
  'authorId',
  'category',
  'entityId',
  'title',
  'description',
]) { }
