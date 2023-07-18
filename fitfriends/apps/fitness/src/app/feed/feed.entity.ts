import { ItemDataIsNotMatchException } from '@fitfriends/exceptions';
import { Entity, Feed } from '@fitfriends/shared-types';

export class FeedEntity implements Entity<FeedEntity>, Feed {
  id?: number;
  date: Date;
  mealOrdinal: number;
  caloriesGain: number;
  authorId: string;

  constructor(entity: Feed) {
    this.fillEntity(entity);
  }

  toObject(): FeedEntity {
    return { ...this };
  }

  updateData(newData: Feed) {
    const currentData = this.toObject();
    if (
      currentData.id !== newData.id ||
      currentData.date.getTime() !== new Date(newData.date).getTime() ||
      currentData.mealOrdinal !== newData.mealOrdinal ||
      currentData.authorId !== newData.authorId
    ) {
      delete currentData.caloriesGain;
      delete newData.caloriesGain;
      throw new ItemDataIsNotMatchException('Feed', { ...this }, newData);
    }
    this.caloriesGain = newData.caloriesGain;
  }

  fillEntity(entity: Feed) {
    this.id = entity?.id;
    this.date = entity.date;
    this.mealOrdinal = entity.mealOrdinal;
    this.caloriesGain = entity.caloriesGain;
    this.authorId = entity.authorId;
  }
}
