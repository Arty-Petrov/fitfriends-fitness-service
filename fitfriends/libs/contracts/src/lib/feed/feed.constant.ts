import { FeedMealType } from '@fitfriends/shared-types';

export enum MealOrdinalRange {
  Min = 0,
  Max = Object.keys(FeedMealType).length - 1,
}
export const FeedApiError = {
  MealOrdinalIsNotValid: `Meal ordinal must be in range ${MealOrdinalRange.Min}, max ${MealOrdinalRange.Max}`,

} as const;

export const FeedApiDescription = {
  Id: 'The uniq order id',
  Date: 'A day of feeding, string in "YYYY-MM-DD" format' ,
  MealOrdinal: `A number of a meal order`,
  CaloriesGain: 'A number of calories customer gained by meal',
  AuthorId: 'The uniq customer id',
} as const;

