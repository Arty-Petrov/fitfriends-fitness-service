import { Entity, UserFriends } from '@fitfriends/shared-types';

export class UserFriendsEntity
  implements Entity<UserFriendsEntity>, UserFriends {
  public id?: string;
  public userId: string;
  public friendIds: string[];

  constructor(entity: UserFriends) {
    this.fillEntity(entity);
  }

  public addFriend(friendId: string): UserFriendsEntity {
    if (this.userId !== friendId) {
      const existFriend = this.friendIds.find((id) => id === friendId);
      if (!existFriend) {
        this.friendIds.push(friendId);
      }
    }
    return this;
  }

  removeFriend(friendId: string): UserFriendsEntity {
    this.friendIds = this.friendIds.filter((id) => id !== friendId);
    return this;
  }

  toObject(): UserFriendsEntity {
    return { ...this };
  }

  fillEntity(entity: UserFriends): void {
    this.id = entity?.id;
    this.userId = entity.userId;
    this.friendIds = entity.friendIds;
  }
}
