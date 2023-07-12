import { GymFeature } from './gym-feature.enum';
import { SubwayStation } from './subway-station.enum';

export interface Gym {
  id?: number;
  title: string;
  location: SubwayStation;
  isVerified: boolean;
  features: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  isFavorite?: boolean;
  createdAt?: Date;
}
