import { GymFeature } from './gym-feature.enum';
import { SubwayStation } from './subway-station.enum';

export interface Gym {
  id?: number;
  name: string;
  location: SubwayStation;
  isVerified: boolean;
  features: GymFeature[];
  photos: string[];
  description: string;
  price: number;
  createdAt?: Date;
}
