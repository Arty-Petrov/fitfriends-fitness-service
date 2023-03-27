import { PickType } from '@nestjs/swagger';
import { GymApi } from '../gym.api';

export class GymCreateDto extends PickType(GymApi, ['name', 'location', 'isVerified', 'features', 'photos', 'description', 'price', 'createdAt']) { }
