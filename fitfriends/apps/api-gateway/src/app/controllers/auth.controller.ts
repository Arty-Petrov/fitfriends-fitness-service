import { UserLogin, UserLoginDto, UserRegister, UserRegisterDto } from '@fitfriends/contracts';
import { ParseFormDataJsonPipe, UploadField } from '@fitfriends/core';
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { RMQService } from 'nestjs-rmq';
import { MulterOptions } from '../../config/multer.config';


@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService: RMQService) {
  }

  @Post('register')
  @UseInterceptors(FileInterceptor(UploadField.Avatar, MulterOptions.Avatar))
  async register(@Body(new ParseFormDataJsonPipe({except: [UploadField.Avatar]}), new ValidationPipe()) dto: UserRegisterDto, @UploadedFile() file: Express.Multer.File) {
    const destination = file.destination;
    const userRegister = {...dto,  avatar: destination };
    try {
      return await this.rmqService.send<UserRegister.Request, UserRegister.Response>(UserRegister.topic, userRegister, { headers: { requestId: 'someRequestId' }});
    } catch (error) {
        if (error instanceof Error) {
          throw new UnauthorizedException(error.message);
        }
      }
    }


  @Post('login')
  async login(@Body() dto: UserLoginDto)
    {
      try {
        return await this.rmqService.send<UserLogin.Request, UserLogin.Response>(UserLogin.topic, dto);
      } catch (error) {
        if (error instanceof Error) {
          throw new UnauthorizedException(error.message);
        }
      }
    }
  }
