import { PickType } from '@nestjs/swagger';
import { GymApi } from '../gym.api';

export class GymCreateDto extends PickType(GymApi, ['title', 'location', 'isVerified', 'features', 'photos', 'description', 'price', 'createdAt']) { }
