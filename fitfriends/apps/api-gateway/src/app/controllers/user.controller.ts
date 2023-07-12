import {
  UserAddFriend,
  UserCardRdo,
  UserGetList,
  UserGetOne,
  UserListQuery,
  UserRemoveFriend,
  UserUpdateData,
  UserUpdateDataDto,
  UserUploadAvatar,
  UserUploadCertificate,
} from '@fitfriends/contracts';
import { MongoidValidationPipe, UploadField } from '@fitfriends/core';
import { Exchanges } from '@fitfriends/rmq';
import { TokenPayload, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MulterOptions } from '../../config/multer.config';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserDataInterceptor } from '../interceptors/user-data-interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get(':id')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @UseGuards(JwtAccessGuard)
  async getOne(
    @Param('id', MongoidValidationPipe) id: string
  ): Promise<UserGetOne.Response> {
    return await this.amqpConnection.request<UserGetOne.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserGetOne.topic,
      payload: { id },
    });
  }

  @Get()
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'Users found',
  })
  @UseGuards(JwtAccessGuard)
  async getList(@Query() dto: UserListQuery): Promise<UserGetList.Response> {
    return await this.amqpConnection.request<UserGetOne.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserGetList.topic,
      payload: dto,
    });
  }

  @Patch('avatar')
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor(UploadField.Avatar, MulterOptions.Avatar))
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @UserData() user: TokenPayload
  ): Promise<UserUploadAvatar.Response> {
    return await this.amqpConnection.request<UserUploadAvatar.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserUploadAvatar.topic,
      payload: {
        id: user.sub,
        avatar: file.path,
      },
    });
  }

  @Patch('certificate')
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor(UploadField.Certificate, MulterOptions.Certificate)
  )
  public async uploadCertificate(
    @UploadedFile() file: Express.Multer.File,
    @UserData() user: TokenPayload
  ): Promise<UserUploadCertificate.Response> {
    return await this.amqpConnection.request<UserUploadCertificate.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserUploadCertificate.topic,
      payload: {
        id: user.sub,
        certificate: file.path,
      },
    });
  }

  @Patch()
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User record updated',
  })
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(UserDataInterceptor)
  async update(@UserData() dto: UserUpdateDataDto) {
    return await this.amqpConnection.request<UserUpdateData.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserUpdateData.topic,
      payload: dto,
    });
  }

  @Put('friend/:id')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User placed to friends list',
  })
  @Roles(UserRole.Customer)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async addFriend(
    @Param('id') friendId: string,
    @UserData('sub') userId: string
  ) {
    return await this.amqpConnection.request<UserAddFriend.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserAddFriend.topic,
      payload: { userId, friendId },
    });
  }

  @Patch('friend/:id')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User removed from friends list',
  })
  @UseGuards(JwtAccessGuard)
  async removeFriend(
    @Param('id') friendId: string,
    @UserData('sub') userId: string
  ) {
    return await this.amqpConnection.request<UserRemoveFriend.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserRemoveFriend.topic,
      payload: { userId, friendId },
    });
  }
}
