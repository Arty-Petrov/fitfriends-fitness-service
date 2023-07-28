import { NoticeCreate, UserFriendListQuery, UserFriendsDto } from '@fitfriends/contracts';
import { UserFriendsNotFoundException } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { NoticeCategory, User, UserFriends, WorkoutInviteStatus } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpStatus, Injectable } from '@nestjs/common';
import UserRepository from '../user/user.repository';
import { WorkoutInviteRepository } from '../workout-invite/workout-invite.repository';
import { UserFriendsEntity } from './user-friends.entity';
import UserFriendsRepository from './user-friends.repository';

type WithWorkoutInviteStatus<T> = T & {
  inviteStatus: WorkoutInviteStatus;
};

@Injectable()
export class UserFriendsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFriendsRepository: UserFriendsRepository,
    private readonly workoutInviteRepository: WorkoutInviteRepository,
    private readonly amqpConnection: AmqpConnection
  ) {}

  public async createMany(dtos: UserFriendsDto[]): Promise<UserFriends[]> {
    let friends: Array<UserFriendsEntity> = [];
    let updatedFriends: Array<UserFriends> = [];
    for (const dto of dtos) {
      const existRecord = await this.userFriendsRepository.findByUserId(
        dto?.userId
      );
      if (existRecord) {
        const { id } = existRecord;
        const friendsEntity = new UserFriendsEntity(dto);
        const userFriends = await this.userFriendsRepository.update(
          id,
          friendsEntity
        );
        updatedFriends = [...updatedFriends, userFriends];
      } else {
        const friendsEntity = new UserFriendsEntity(dto);
        friends = [...friends, friendsEntity];
      }
    }
    if (friends) {
      const newFriends = await this.userFriendsRepository.createMany(friends);
      return [...newFriends, ...updatedFriends];
    }
    return updatedFriends;
  }

  public async getFriendList(
    query: UserFriendListQuery
  ): Promise<Array<WithWorkoutInviteStatus<User>>> {
    const { userId } = query;
    const friends = await this.userFriendsRepository.findFriends(query);
    const invitees = await this.workoutInviteRepository.findInvitee(userId);
    return friends.map<WithWorkoutInviteStatus<User>>((friend) => {
      const workoutInvite = invitees.find(
        (invitee) => invitee.inviteeId === friend.id
      );
      return { ...friend, inviteStatus: (!workoutInvite) ? null: workoutInvite.status };
    });
  }

  public async addFriend(
    userId: string,
    friendId: string
  ): Promise<User | null> {
    const existRecord = await this.userFriendsRepository.findByUserId(userId);
    if (!existRecord) {
      const userFriendsEntity = new UserFriendsEntity({
        userId: userId,
        friendIds: [friendId],
      });
      await this.userFriendsRepository.create(userFriendsEntity);
    }
    const userFriendsEntity = new UserFriendsEntity(existRecord);
    userFriendsEntity.addFriend(friendId);
    const { id: entityId } = userFriendsEntity;
    await this.userFriendsRepository.update(entityId, userFriendsEntity);
    const { name: authorName, gender: authorGenger } =
      await this.userRepository.findById(userId);
    const friend = await this.userRepository.findById(friendId);
    await this.amqpConnection.publish(
      Exchanges.notice.name,
      NoticeCreate.topic,
      {
        senderId: userId,
        senderName: authorName,
        senderGender: authorGenger,
        recipientId: friendId,
        category: NoticeCategory.NewFriend,
      }
    );
    return friend;
  }

  public async removeFriend(
    userId: string,
    friendId: string
  ): Promise<void | HttpStatus.ACCEPTED> {
    const existRecord = await this.userFriendsRepository.findByUserId(userId);
    if (!existRecord) {
      throw new UserFriendsNotFoundException(userId);
    }
    const userFriendsEntity = new UserFriendsEntity(existRecord);
    userFriendsEntity.removeFriend(friendId);
    const { id: entityId } = userFriendsEntity;
    if (userFriendsEntity.friendIds.length) {
      return this.destroy(entityId);
    }
    await this.userFriendsRepository.update(entityId, userFriendsEntity);
    return HttpStatus.ACCEPTED;
  }

  public async destroy(id: string): Promise<void | HttpStatus.ACCEPTED> {
    await this.userFriendsRepository.destroy(id);
    return HttpStatus.ACCEPTED;
  }
}
