import { FeedCreateDto } from '@fitfriends/contracts';

export const generateFeed = (
  date: Date,
  mealOrdinal: number,
  caloriesGain: number,
  authorId: string,
): FeedCreateDto => ({
      date: date,
      mealOrdinal: mealOrdinal,
      caloriesGain: caloriesGain,
      authorId: authorId,
    });
