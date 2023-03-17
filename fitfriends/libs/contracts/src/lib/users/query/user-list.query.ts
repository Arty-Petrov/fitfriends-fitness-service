import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserListQuery extends PickType(UserApi, ['role', 'subwayStation', 'trainingTypes', 'experience', 'sort', 'page', 'count']) { }
