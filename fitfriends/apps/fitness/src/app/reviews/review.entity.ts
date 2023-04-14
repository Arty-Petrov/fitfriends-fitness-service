import { Entity, Review } from '@fitfriends/shared-types';

export class ReviewEntity implements Entity<ReviewEntity>, Review {
  id?: number;
  trainingId: number;
  authorId: string;
  text: string;
  evaluation: number;

  constructor(entity: Review) {
    this.fillEntity(entity);
  }

  toObject(): ReviewEntity {
    return { ...this };
  }

  fillEntity(entity: Review) {
  this.id = entity?.id;
  this.trainingId = entity.trainingId;
  this.authorId = entity.authorId;
  this.text = entity.text;
  this.evaluation = entity.evaluation;
  }
}
