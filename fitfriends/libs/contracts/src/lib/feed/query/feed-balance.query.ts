import { PickType } from '@nestjs/swagger';
import { FeedApi } from '../feed.api';

export class FeedBalanceQuery extends PickType(FeedApi, [
  'authorId'
]) { }
