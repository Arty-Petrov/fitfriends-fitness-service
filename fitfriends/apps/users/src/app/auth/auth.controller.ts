import { UserLogin, UserLogout, UserRefreshToken, UserRegister } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Body, Controller, HttpStatus, Logger } from '@nestjs/common';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
public constructor(private readonly authService: AuthService) { }

  @RMQValidate()
  @RMQRoute(UserRegister.topic)
  async register(dto: UserRegister.Request, @RMQMessage msg: Message): Promise<UserRegister.Response> {
    const rid = msg.properties.headers['requestId'];
    const logger = new Logger(rid);
    logger.error('error message');
    const user = await this.authService.register(dto);
    return fillObject(UserRegister.Response, user);
  }

  @RMQValidate()
  @RMQRoute(UserLogin.topic)
  public  async login(@Body() dto: UserLogin.Request): Promise<UserLogin.Response> {
    const tokens = await
    this.authService.login(dto);
    return fillObject(UserLogin.Response, tokens);
  }

  @RMQValidate()
  @RMQRoute(UserLogout.topic)
  public  async logout(@Body() dto: UserLogout.Request): Promise<HttpStatus> {
    return this.authService.logout(dto);
  }

  @RMQValidate()
  @RMQRoute(UserRefreshToken.topic)
  public async refresh(@Body() dto: UserRefreshToken.Request): Promise<UserRefreshToken.Response> {
    return await this.authService.createRefreshTokens(dto);
  }

}
