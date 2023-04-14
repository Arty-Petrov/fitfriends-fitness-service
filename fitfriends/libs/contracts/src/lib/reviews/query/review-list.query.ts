import { PickType } from '@nestjs/swagger';
import { ReviewQueryApi } from '../review-query.api';

export class ReviewListQuery extends PickType(ReviewQueryApi, ['trainingId', 'sortCreation', 'page', 'count']) { }
