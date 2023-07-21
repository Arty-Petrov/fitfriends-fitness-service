import { PickType } from '@nestjs/swagger';
import { FeedApi } from '../feed.api';

export class FeedDiaryQuery extends PickType(FeedApi, [
  'authorId'
]) { }
