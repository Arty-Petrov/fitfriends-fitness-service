import { UserGetOne } from '@fitfriends/contracts';
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
}
