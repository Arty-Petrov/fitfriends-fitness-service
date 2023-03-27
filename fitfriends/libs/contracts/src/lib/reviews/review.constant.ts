import { SortOrder } from '@fitfriends/shared-types';

export const DEFAULT_REVIEWS_PAGINATION_COUNT = 1;
export const DEFAULT_REVIEWS_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_REVIEWS_COUNT_LIMIT = 50;

export const enum ReviewTextLength {
  Min = 100,
  Max = 1024,
}

export enum ReviewEvaluationRange {
  Min = 1,
  Max = 5,
}

export const ReviewApiError = {
  EvaluationIsNotValid: `The evaluation value must be in range of ${ReviewEvaluationRange.Min} — ${ReviewEvaluationRange.Max}`,
  TextIsNotValid: `The text length must be minimumi ${ReviewTextLength.Min} and maximum ${ReviewTextLength.Max}`,
} as const;

export const ReviewApiDescription = {
  Id: 'The review uniq id',
  TrainingId: 'Existing training id',
  AuthorId: 'Review author existing user id',
  Evaluation: `Training evaluation a value is a number from ${ReviewEvaluationRange.Min} to ${ReviewEvaluationRange.Max}`,
  Text: `Review text is a string minimum ${ReviewTextLength.Min} maximum ${ReviewTextLength.Max} chars length`,
  CreatedAt: 'Authomatic generated rteview criation date',
} as const;
