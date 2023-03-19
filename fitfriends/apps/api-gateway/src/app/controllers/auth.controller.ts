import { UserLoggedRdo, UserLogin, UserLoginDto, UserRdo, UserRegister, UserRegisterDto } from '@fitfriends/contracts';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('register')
  async register(@Body() dto: UserRegisterDto): Promise<UserRdo> {
    try {
      return await this.rmqService.send<UserRegister.Request, UserRegister.Response>(UserRegister.topic, dto, { headers: { requestId: 'someRequestId' } });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: UserLoginDto): Promise<UserLoggedRdo> {
    try {
      return await this.rmqService.send<UserLogin.Request, UserLogin.Response>(UserLogin.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
