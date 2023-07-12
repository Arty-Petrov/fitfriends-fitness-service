import { PickType } from '@nestjs/swagger';
import { GymQueryApi } from '../gym-query.api';

export class GymQuery extends PickType(GymQueryApi, ['userId', 'itemId']) { }
