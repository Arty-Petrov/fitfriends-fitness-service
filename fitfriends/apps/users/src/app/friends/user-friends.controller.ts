import { UserAddFriend, UserGetFriendList, UserRemoveFriend, UserSeedFriends } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, HttpStatus } from '@nestjs/common';
import { UserFriendsService } from './user-friends.service';

@Controller()
export class UserFriendsController {
  constructor(private readonly userFriendsService: UserFriendsService) { }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserSeedFriends.topic,
    queue: UserSeedFriends.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: UserSeedFriends.Request
  ): Promise<UserSeedFriends.Response> {
    const userFriends = await this.userFriendsService.createMany(dtos);
    return fillObject(UserSeedFriends.Response, userFriends);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserGetFriendList.topic,
    queue: UserGetFriendList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    dto: UserGetFriendList.Request
  ): Promise<UserGetFriendList.Response> {
    const user = await this.userFriendsService.getFriendList(dto);
    return fillObject(UserGetFriendList.Response, user);
  }


  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserAddFriend.topic,
    queue: UserAddFriend.queue,
    errorHandler: rmqErrorCallback,
  })
  public async addFriend(
    { userId, friendId }: UserAddFriend.Request
  ): Promise<UserAddFriend.Response> {
    const user = await this.userFriendsService.addFriend(userId, friendId);
    return fillObject(UserAddFriend.Response, user, [user.role]);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserRemoveFriend.topic,
    queue: UserRemoveFriend.queue,
    errorHandler: rmqErrorCallback,
  })
  public async removeFriend(
    { userId, friendId }: UserRemoveFriend.Request
  ): Promise<void | HttpStatus.ACCEPTED> {
    return this.userFriendsService.removeFriend(userId, friendId);
  }
}
