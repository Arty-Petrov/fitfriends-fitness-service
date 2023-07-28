import { UserRefreshToken, UserSignIn, UserSignOut, UserSignUp } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) { }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserSignUp.topic,
    queue: UserSignUp.queue,
    errorHandler: rmqErrorCallback,
  })
  async signUp(dto: UserSignUp.Request): Promise<UserSignUp.Response> {
    const user = await this.authService.signUp(dto);
    return fillObject(UserSignUp.Response, user);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserSignIn.topic,
    queue: UserSignIn.queue,
    errorHandler: rmqErrorCallback,
  })
  public async signIn(dto: UserSignIn.Request): Promise<UserSignIn.Response> {
    const tokens = await this.authService.signIn(dto);
    return fillObject(UserSignIn.Response, tokens);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserSignOut.topic,
    queue: UserSignOut.queue,
    errorHandler: rmqErrorCallback,
  })
  public async signOut(dto: UserSignOut.Request): Promise<HttpStatus> {
    return this.authService.signOut(dto);
  }

  @RabbitRPC({
    exchange: Exchanges.user.name,
    routingKey: UserRefreshToken.topic,
    queue: UserRefreshToken.queue,
    errorHandler: rmqErrorCallback,
  })
  public async refreshToken(
    dto: UserRefreshToken.Request
  ): Promise<UserRefreshToken.Response> {
    return await this.authService.refreshToken(dto);
  }
}
