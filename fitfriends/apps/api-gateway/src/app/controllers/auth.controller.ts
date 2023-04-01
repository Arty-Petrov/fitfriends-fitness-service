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
import { AuthUserData, UploadField } from '@fitfriends/core';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { RMQService } from 'nestjs-rmq';
import { MulterOptions } from '../../config/multer.config';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) { }

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
  @UseInterceptors(FileInterceptor(UploadField.Certificate, MulterOptions.Certificate))
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
  public async signUp(@Body() dto: UserSignUpDto): Promise<UserSignUp.Response> {
    try {
      return await this.rmqService.send<
        UserSignUp.Request,
        UserSignUp.Response>
        (UserSignUp.topic, dto);
    } catch (error) {
      if (error instanceof Error) {
        throw new  UnauthorizedException(error.message);
      }
    }
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
    try {
      return await this.rmqService.send<
        UserSignIn.Request,
        UserSignIn.Response
      >(
        UserSignIn.topic,
        dto
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User has been successfully logged out.',
  })
  @UseGuards(JwtRefreshGuard)
  public async signOut(
    @AuthUserData() { refreshTokenId }: UserRefreshTokenDto
  ): Promise<UserSignOut.Response> {
    try {
      return await this.rmqService.send<
        UserSignOut.Request,
        UserSignOut.Response
      >(
        UserSignOut.topic, { refreshTokenId });
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  public async refresh(
    @AuthUserData() refreshTokenPayload: UserRefreshTokenDto

  ): Promise<UserRefreshToken.Response> {
    try {
      return await this.rmqService.send<
        UserRefreshToken.Request,
        UserRefreshToken.Response
      >(
        UserRefreshToken.topic, refreshTokenPayload
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
