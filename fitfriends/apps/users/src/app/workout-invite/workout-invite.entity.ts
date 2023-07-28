import { ItemDataIsNotMatchException, WorkoutInviteStatusNotAllowedException } from '@fitfriends/exceptions';
import { Entity, WorkoutInvite, WorkoutInviteStatus } from '@fitfriends/shared-types';

export class WorkoutInviteEntity
  implements Entity<WorkoutInviteEntity>, WorkoutInvite {
  public id?: string;
  public authorId: string;
  public inviteeId: string;
  public status: WorkoutInviteStatus;

  constructor(entity: WorkoutInvite) {
    this.fillEntity(entity);
  }

  toObject(): WorkoutInviteEntity {
    return { ...this };
  }

  updateData(newData: WorkoutInvite) {
    const currentData = this.toObject();
    if (
      currentData.authorId !== newData.authorId ||
      currentData.inviteeId !== newData.inviteeId
    ) {
      delete currentData.status;
      delete newData.status;
      throw new ItemDataIsNotMatchException('Workout invite', { ...this }, newData);
    }
    if (currentData.status === WorkoutInviteStatus.Rejected ||
      currentData.status === WorkoutInviteStatus.Accepted
    ) {
      throw new WorkoutInviteStatusNotAllowedException(this.status, currentData.status);
    }
    this.status = newData.status;
  }

  fillEntity(entity: WorkoutInvite): void {
    this.id = entity?.id;
    this.authorId = entity.authorId;
    this.inviteeId = entity.inviteeId;
    this.status = entity.status ?? WorkoutInviteStatus.Pending;
  }
}
