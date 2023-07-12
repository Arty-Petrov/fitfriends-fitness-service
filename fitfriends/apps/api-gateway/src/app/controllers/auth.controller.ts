import {
  UserRefreshToken,
  UserRefreshTokenDto,
  UserSignedRdo,
  UserSignIn,
  UserSignInDto,
  UserSignOut,
  UserSignUp,
  UserSignUpDto,
  UserUploadAvatar,
  UserUploadCertificate,
} from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { Exchanges } from '@fitfriends/rmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { MulterOptions } from '../../config/multer.config';
import { UserData } from '../decorators/user-data.decorator';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('avatar')
  @UseInterceptors(FileInterceptor(UploadField.Avatar, MulterOptions.Avatar))
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserUploadAvatar.Response> {
    return {
      avatar: file.path,
    };
  }

  @Post('certificate')
  @UseInterceptors(
    FileInterceptor(UploadField.Certificate, MulterOptions.Certificate)
  )
  public async uploadCertificate(
    @UploadedFile() file: Express.Multer.File
  ): Promise<UserUploadCertificate.Response> {
    return {
      certificate: file.path,
    };
  }

  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @UseGuards(NoAuthGuard)
  public async signUp(
    @Body() dto: UserSignUpDto
  ): Promise<UserSignUp.Response> {
    return await this.amqpConnection.request<UserSignUp.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserSignUp.topic,
      payload: dto,
    });
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: UserSignedRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @UseGuards(NoAuthGuard)
  public async signIn(
    @Body() dto: UserSignInDto
  ): Promise<UserSignIn.Response> {
    return await this.amqpConnection.request<UserSignIn.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserSignIn.topic,
      payload: dto,
    });
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User has been successfully logged out.',
  })
  @UseGuards(JwtRefreshGuard)
  public async signOut(
    @UserData() { refreshTokenId }: UserRefreshTokenDto
  ): Promise<UserSignOut.Response> {
    return await this.amqpConnection.request<UserSignOut.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserSignOut.topic,
      payload: { refreshTokenId },
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  public async refresh(
    @UserData() refreshTokenPayload: UserRefreshTokenDto
  ): Promise<UserRefreshToken.Response> {
    return await this.amqpConnection.request<UserRefreshToken.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserRefreshToken.topic,
      payload: refreshTokenPayload,
    });
  }
}
