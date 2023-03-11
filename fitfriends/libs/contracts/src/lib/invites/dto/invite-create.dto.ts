import { PickType } from '@nestjs/swagger';
import { InviteApi } from '../invite.api';

export class InviteCreateDto extends PickType(InviteApi, ['customerId', 'recipientId']) { }
