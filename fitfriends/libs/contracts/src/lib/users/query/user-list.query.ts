import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserListQuery extends PickType(UserApi, ['role', 'location', 'traningType', 'expirience', 'sort', 'page', 'count']) { }
