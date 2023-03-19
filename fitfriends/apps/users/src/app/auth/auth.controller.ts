import { UserLogin, UserRegister } from '@fitfriends/contracts';
import { Body, Controller, Logger } from '@nestjs/common';
import { Message, RMQMessage, RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @RMQValidate()
  @RMQRoute(UserRegister.topic)
  async register(dto: UserRegister.Request, @RMQMessage msg: Message): Promise<UserRegister.Response> {
    const rid = msg.properties.headers['requestId'];
    const logger = new Logger(rid);
    logger.error('sdfsdf');
    return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(UserLogin.topic)
  async login(@Body() { email, password }: UserLogin.Request): Promise<UserLogin.Response> {
    const { id } = await this.authService.validateUser(email, password);
    return this.authService.login(id);
  }
}
