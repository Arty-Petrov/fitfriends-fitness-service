import { UserFriendListQuery, UserFriendsDto } from '@fitfriends/contracts';
import { UserFriendsNotFoundException } from '@fitfriends/exceptions';
import { User, UserFriends } from '@fitfriends/shared-types';
import { HttpStatus, Injectable } from '@nestjs/common';
import UserRepository from '../user/user.repository';
import { UserFriendsEntity } from './user-friends.entity';
import UserFriendsRepository from './user-friends.repository';

@Injectable()
export class UserFriendsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFriendsRepository: UserFriendsRepository
  ) { }

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

  public async getFriendList(query: UserFriendListQuery): Promise<User[]> {
    return this.userFriendsRepository.findFriends(query);
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
    return this.userRepository.findById(friendId);
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
