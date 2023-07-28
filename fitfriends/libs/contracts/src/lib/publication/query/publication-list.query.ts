import { PickType } from '@nestjs/swagger';
import { PublicationApi } from '../publication.api';

export class PublicationListQuery extends PickType(PublicationApi,[
  'authorId',
  'category',
]){}
