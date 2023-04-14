import { Entity, Training, TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';

export class TrainingEntity implements Entity<TrainingEntity>, Training {
  id?: number;
  title: string;
  image: string;
  experience: UserExperience;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  caloriesLoss: number;
  description: string;
  gender: UserGender;
  video: string;
  authorId: string;
  isSpecialOffer: boolean;

  constructor(entity: Training) {
    this.fillEntity(entity);
  }

  toObject(): TrainingEntity {
    return { ...this };
  }

  fillEntity(entity: Training) {
  this.id = entity?.id;
  this.title = entity.title;
  this.image = entity.image;
  this.experience = entity.experience;
  this.type = entity.type;
  this.duration = entity.duration;
  this.price = entity.price;
  this.caloriesLoss = entity.caloriesLoss;
  this.description = entity.description;
  this.gender = entity.gender;
  this.video = entity.video;
  this.authorId = entity.authorId;
  this.isSpecialOffer = entity.isSpecialOffer;
  }
}
