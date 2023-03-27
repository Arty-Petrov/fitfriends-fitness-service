import {
  UserLoggedRdo,
  UserLogin,
  UserLoginDto,
  UserLogout,
  UserLogoutDto,
  UserRefreshToken,
  UserRefreshTokenDto,
  UserRegister,
  UserRegisterDto,
} from '@fitfriends/contracts';
import { fillObject, ParseFormDataJsonPipe, UploadField } from '@fitfriends/core';
import { RefreshTokenPayload, RequestWithTokenPayload } from '@fitfriends/shared-types';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { RMQService } from 'nestjs-rmq';
import { MulterOptions } from '../../config/multer.config';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @UseInterceptors(FileInterceptor(UploadField.Avatar, MulterOptions.Avatar))
  public async register(
    @Body(
      new ParseFormDataJsonPipe({ except: [UploadField.Avatar] }),
      new ValidationPipe()
    ) dto: UserRegisterDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserRegister.Response> {
    const { destination } = file;
    const userRegister = { ...dto, avatar: destination };
    try {
      return await this.rmqService
      .send<UserRegister.Request, UserRegister.Response>(
        UserRegister.topic,
        userRegister, { headers: { requestId: 'someRequestId' } }
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserLoggedRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(
    @Body() dto: UserLoginDto
  ) {
    try {
      return await this.rmqService
      .send<UserLogin.Request, UserLogin.Response>(
        UserLogin.topic, dto
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User has been successfully logged out.',
  })
  public async logout(
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const refreshTokenId = fillObject(UserLogoutDto, {...request.user});
    try {
      return await this.rmqService
      .send<UserLogout.Request, UserLogout.Response>(
        UserLogout.topic, refreshTokenId
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refresh(
    @Req() request: RequestWithTokenPayload<RefreshTokenPayload>
  ) {
    const refreshTokenPayload = fillObject(UserRefreshTokenDto, {...request.user});
    try {
      return await this.rmqService
      .send<UserRefreshToken.Request, UserRefreshToken.Response>(
        UserRefreshToken.topic, refreshTokenPayload
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
