import { PickType } from '@nestjs/swagger';
import { InviteApi } from '../invite.api';

export class InviteGetListQuery extends PickType(InviteApi, ['sort', 'page', 'count']) { }
