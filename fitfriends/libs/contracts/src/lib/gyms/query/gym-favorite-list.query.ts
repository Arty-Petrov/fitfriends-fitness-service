import { PickType } from '@nestjs/swagger';
import { GymQueryApi } from '../gym-query.api';

export class GymFavoriteListQuery extends PickType(GymQueryApi, ['page', 'count', 'userId']) { }
