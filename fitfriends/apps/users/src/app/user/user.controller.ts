import {
  UserAddFriend,
  UserGetList,
  UserGetOne, UserRemoveFriend,
  UserUpdateData,
  UserUploadAvatar,
  UserUploadCertificate,
} from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @RMQValidate()
  @RMQRoute(UserGetOne.topic)
  public async getOne(@Body() { id }: UserGetOne.Request): Promise<UserGetOne.Response> {
    const user = await this.userService.getById(id);
    return fillObject(UserGetOne.Response, user, [user.role]);
  }

  @RMQValidate()
  @RMQRoute(UserGetList.topic)
  public async getList(@Body() dto: UserGetList.Request): Promise<UserGetList.Response> {
    const user = await this.userService.getUsersList(dto);
    return fillObject(UserGetList.Response, user);
  }

  @RMQValidate()
  @RMQRoute(UserUpdateData.topic)
  public async update(@Body() dto: UserUpdateData.Request): Promise<UserUpdateData.Response> {
    const user = await this.userService.update(dto);
    return fillObject(UserUpdateData.Response, user, [user.role]);
  }

  @RMQValidate()
  @RMQRoute(UserUploadAvatar.topic)
  public async updateAvatar(@Body() dto: UserUploadAvatar.Request): Promise<UserUploadAvatar.Response> {
    const user = await this.userService.updateFiles(dto);
    return fillObject(UserUploadAvatar.Response, user, [user.role]);
  }

  @RMQValidate()
  @RMQRoute(UserUploadCertificate.topic)
  public async updateCertificate(@Body() dto: UserUploadCertificate.Request): Promise<UserUploadCertificate.Response> {
    const user = await this.userService.updateFiles(dto);
    return fillObject(UserUploadCertificate.Response, user, [user.role]);
  }
}
