import { InviteStatus } from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { InviteApi } from '../invite.api';

export class InviteCardRdo extends PickType(InviteApi, ['id', 'customerId', 'recipientId', 'createdAt', 'updatedAt', 'status']) {
  @Expose()
  public id: string;

  @Expose()
  public customerId: string;

  @Expose()
  public recipientId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public status: InviteStatus;
}
