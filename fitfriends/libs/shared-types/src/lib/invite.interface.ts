import { InviteStatus } from './invite-status.enum';

export interface Invite {
  id?: string;
  customerId: string;
  recipientId: string;
  createdAt: Date;
  updatedAt: Date;
  status: InviteStatus;
}
