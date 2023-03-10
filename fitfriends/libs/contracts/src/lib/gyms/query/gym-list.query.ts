import { PickType } from '@nestjs/swagger';
import { GymApi } from '../gym.api';

export class GymListQuery extends PickType(GymApi, ['sort', 'page', 'count']) { }
