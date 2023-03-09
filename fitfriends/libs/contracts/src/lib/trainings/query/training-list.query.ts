import { PickType } from '@nestjs/swagger';
import { TrainingApi } from '../training.api';

export class TrainingListQuery extends PickType(TrainingApi, ['priceMin', 'priceMax', 'caloriesMin', 'caloriesMax', 'rating', 'sort', 'page', 'count']) { }
