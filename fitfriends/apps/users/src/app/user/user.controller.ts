import {
  UserCreateMany,
  UserGetList,
  UserGetOne,
  UserUpdateData,
  UserUploadAvatar,
  UserUploadCertificate,
} from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserCreateMany.topic,
    queue: UserCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dto: UserCreateMany.Request
  ): Promise<UserCreateMany.Response> {
    const users = await this.userService.createMany(dto);
    return fillObject (UserCreateMany.Response, users);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserGetOne.topic,
    queue: UserGetOne.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getOne(
    { id }: UserGetOne.Request
  ): Promise<UserGetOne.Response> {
    const user = await this.userService.getById(id);
    return fillObject(UserGetOne.Response, user, [user.role]);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserGetList.topic,
    queue: UserGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    dto: UserGetList.Request
  ): Promise<UserGetList.Response> {
    const users = await this.userService.getUsersList(dto);
    return fillObject(UserGetList.Response, users);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserUpdateData.topic,
    queue: UserUpdateData.queue,
    errorHandler: rmqErrorCallback,
  })
  public async update(
    dto: UserUpdateData.Request
  ): Promise<UserUpdateData.Response> {
    const user = await this.userService.update(dto);
    return fillObject(UserUpdateData.Response, user, [user.role]);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserUploadAvatar.topic,
    queue: UserUploadAvatar.queue,
    errorHandler: rmqErrorCallback,
  })
  public async updateAvatar(
    dto: UserUploadAvatar.Request
  ): Promise<UserUploadAvatar.Response> {
    const user = await this.userService.updateFiles(dto);
    return fillObject(UserUploadAvatar.Response, user, [user.role]);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserUploadCertificate.topic,
    queue: UserUploadCertificate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async updateCertificate(
    dto: UserUploadCertificate.Request
  ): Promise<UserUploadCertificate.Response> {
    const user = await this.userService.updateFiles(dto);
    return fillObject(UserUploadCertificate.Response, user, [user.role]);
  }
}
