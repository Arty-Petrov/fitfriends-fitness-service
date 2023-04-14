import {
  StorageDeleteFile,
  UserListQuery,
  UserSignUpDto,
  UserUpdateDataDto,
  UserUpdateFriendListDto,
} from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import {
  UserFriendsNotFoundException,
  UserNotFoundException,
  UserNotRegisteredException,
} from '@fitfriends/exceptions';
import { User } from '@fitfriends/shared-types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserFriendsEntity } from '../friends/user-friends.entity';
import UserFriendsRepository from '../friends/user-friends.repository';
import { UserEntity } from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFriendsRepository: UserFriendsRepository,
    private readonly rmqService: RMQService
  ) { }

  public async createMany(dtos: UserSignUpDto[]): Promise<User[]> {
    const users: UserEntity[] = [];
    for (const dto of dtos) {
      const { email, password } = dto;
      delete dto.password;
      const existUser = await this.userRepository.findByEmail(email);
      if (existUser ) {
        break;
      }
      const userEntity = await new UserEntity(dto).setPassword(password);
      users.push(userEntity);
    }
    return this.userRepository.createMany(users);
  }

  public async getById(id: string): Promise<User | null> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundException(id);
    }
    return existUser;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }
    return existUser;
  }

  public async getUsersList(query: UserListQuery): Promise<User[]> {
    return this.userRepository.find(query);
  }

  public async update(dto: UserUpdateDataDto): Promise<User | null> {
    const { id } = dto;
    delete dto.id;
    const existUser = await this.getById(id);
    const newUserEntity = new UserEntity({ ...existUser, ...dto });
    return this.userRepository.update(id, newUserEntity);
  }

  public async updateFiles(dto: UserUpdateDataDto) {
    const id = dto?.id;
    const fieldName = Object.values(UploadField)
      .filter((field) => dto[field])
      .toString();
    const existUser = await this.getById(id);
    const filePath = existUser[fieldName];
    await this.rmqService.notify<StorageDeleteFile.Request>(
      StorageDeleteFile.topic,
      { fileName: filePath }
    );
    return this.update({ id, [fieldName]: dto[fieldName] });
  }

  public async addFriend(dto: UserUpdateFriendListDto) {
    const { userId, friendId } = dto;
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

  public async removeFriend(dto: UserUpdateFriendListDto) {
    const { userId, friendId } = dto;
    const existRecord = await this.userFriendsRepository.findByUserId(userId);
    if (!existRecord) {
      throw new UserFriendsNotFoundException(userId);
    }
    const userFriendsEntity = new UserFriendsEntity(existRecord);
    userFriendsEntity.removeFriend(friendId);
    const { id: entityId } = userFriendsEntity;
    await this.userFriendsRepository.update(entityId, userFriendsEntity);
    return HttpStatus.ACCEPTED;
  }
  public async destroy(id: string): Promise<void> {
    return this.userRepository.destroy(id);
  }
}
