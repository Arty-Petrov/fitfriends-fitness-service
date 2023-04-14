import {
  UserAddFriend,
  UserGetFriendList,
  UserGetList,
  UserRemoveFriend,
  UserSeedFriends,
} from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Body, Controller, HttpStatus } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserFriendsService } from './user-friends.service';

@Controller()
export class UserFriendsController {
  constructor(private readonly userFriendsService: UserFriendsService) { }

  @RMQValidate()
  @RMQRoute(UserSeedFriends.topic)
  public async createMany(
    @Body() dtos: UserSeedFriends.Request
  ): Promise<UserSeedFriends.Response> {
    const userFriends = await this.userFriendsService.createMany(dtos);
    return fillObject(UserSeedFriends.Response, userFriends);
  }

  @RMQValidate()
  @RMQRoute(UserGetFriendList.topic)
  public async getList(
    @Body() dto: UserGetList.Request
  ): Promise<UserGetList.Response> {
    const user = await this.userFriendsService.getFriendList(dto);
    return fillObject(UserGetList.Response, user);
  }


  @RMQValidate()
  @RMQRoute(UserAddFriend.topic)
  public async addFriend(
    @Body() { userId, friendId }: UserAddFriend.Request
  ): Promise<UserAddFriend.Response> {
    const user = await this.userFriendsService.addFriend(userId, friendId);
    return fillObject(UserAddFriend.Response, user, [user.role]);
  }

  @RMQValidate()
  @RMQRoute(UserRemoveFriend.topic)
  public async removeFriend(
    @Body() { userId, friendId }: UserRemoveFriend.Request
  ): Promise<void | HttpStatus.ACCEPTED> {
    return this.userFriendsService.removeFriend(userId, friendId);
  }
}
