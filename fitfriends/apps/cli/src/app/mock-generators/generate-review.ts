import { faker } from '@faker-js/faker';
import { ReviewCreateDto, ReviewEvaluationRange } from '@fitfriends/contracts';

export const generateReview = (trainingId: number, customerId: string): ReviewCreateDto => ({
  trainingId: trainingId,
  authorId: customerId,
  text: faker.lorem.sentence(20),
  evaluation: faker.datatype.number({
    min: ReviewEvaluationRange.Min,
    max: ReviewEvaluationRange.Max,
  }),
});
