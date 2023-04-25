import { Entity, Gym, GymFeature, SubwayStation } from '@fitfriends/shared-types';

export class GymEntity implements Entity<GymEntity>, Gym {
  id?: number;
  title: string;
  location: SubwayStation;
  isVerified: boolean;
  features: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  createdAt?: Date;

  constructor(entity: Gym) {
    this.fillEntity(entity);
  }

  toObject(): GymEntity {
    return { ...this };
  }

  fillEntity(entity: Gym) {
  this.id = entity?.id;
  this.title = entity.title;
  this.location = entity.location;
  this.isVerified= entity.isVerified;
  this.features = entity.features;
  this.photos = entity.photos;
  this.description = entity.description;
  this.price = entity.price;
  this.createdAt = entity.createdAt;
  }
}
