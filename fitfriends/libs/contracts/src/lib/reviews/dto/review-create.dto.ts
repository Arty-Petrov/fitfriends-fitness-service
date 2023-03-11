import { PickType } from '@nestjs/swagger';
import { ReviewApi } from '../review.api';

export class ReviewCreateDto extends PickType(ReviewApi, ['trainingId', 'authorId', 'text', 'evaluation']) { }
