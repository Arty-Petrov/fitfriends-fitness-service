import { PickType } from '@nestjs/swagger';
import { ReviewApi } from '../review.api';

export class ReviewListQuery extends PickType(ReviewApi, ['trainingId', 'sort', 'page', 'count']) { }
