import { UserRefreshToken, UserSignIn, UserSignOut, UserSignUp } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Body, Controller, HttpStatus } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
public constructor(private readonly authService: AuthService) { }

  @RMQValidate()
  @RMQRoute(UserSignUp.topic)
  async signUp(dto: UserSignUp.Request): Promise<UserSignUp.Response> {
    const user = await this.authService.signUp(dto);
    return fillObject(UserSignUp.Response, user);
  }

  @RMQValidate()
  @RMQRoute(UserSignIn.topic)
  public  async signIn(@Body() dto: UserSignIn.Request): Promise<UserSignIn.Response> {
    const tokens = await
    this.authService.signIn(dto);
    return fillObject(UserSignIn.Response, tokens);
  }

  @RMQValidate()
  @RMQRoute(UserSignOut.topic)
  public  async signOut(@Body() dto: UserSignOut.Request): Promise<HttpStatus> {
    return this.authService.signOut(dto);
  }

  @RMQValidate()
  @RMQRoute(UserRefreshToken.topic)
  public async refreshToken(@Body() dto: UserRefreshToken.Request): Promise<UserRefreshToken.Response> {
    return await this.authService.refreshToken(dto);
  }

}
