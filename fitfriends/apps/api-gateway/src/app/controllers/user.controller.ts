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
import { TokenPayload, UserRole } from '@fitfriends/shared-types';
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
import { RMQService } from 'nestjs-rmq';
import { MulterOptions } from '../../config/multer.config';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserDataInterceptor } from '../interceptors/user-data-interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly rmqService: RMQService) { }

  @Get(':id')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @UseGuards(JwtAccessGuard)
  async getOne(
    @Param('id', MongoidValidationPipe) id: string,
  ): Promise<UserGetOne.Response> {
    return await this.rmqService.send<UserGetOne.Request, UserGetOne.Response>(
      UserGetOne.topic,
      { id }
    );
  }

  @Get()
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'Users found',
  })
  @UseGuards(JwtAccessGuard)
  async getList(
    @Query() dto: UserListQuery,
  ): Promise<UserGetList.Response> {
    return await this.rmqService.send<UserGetList.Request, UserGetList.Response>(
      UserGetList.topic, dto);
  }

  @Patch('avatar')
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(FileInterceptor(UploadField.Avatar, MulterOptions.Avatar))
  public async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @UserData() user: TokenPayload,
  ): Promise<UserUploadAvatar.Response> {
    const dto = {
      id: user.sub,
      avatar: file.path,
    }
    return await this.rmqService.send<
      UserUploadAvatar.Request,
      UserUploadAvatar.Response
    >(UserUploadAvatar.topic, dto);
  }

  @Patch('certificate')
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor(UploadField.Certificate, MulterOptions.Certificate))
  public async uploadCertificate(
    @UploadedFile() file: Express.Multer.File,
    @UserData() user: TokenPayload,
  ): Promise<UserUploadCertificate.Response> {
    const dto = {
      id: user.sub,
      certificate: file.path,
    }
    return await this.rmqService.send<
      UserUploadCertificate.Request,
      UserUploadCertificate.Response
    >(UserUploadCertificate.topic, dto);
  }

  @Patch()
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User record updated',
  })
  @UseGuards(JwtAccessGuard)
  @UseInterceptors(UserDataInterceptor)
  async update(
    @UserData() dto: UserUpdateDataDto
  ) {
    return await this.rmqService.send<
      UserUpdateData.Request,
      UserUpdateData.Response
    >(UserUpdateData.topic, dto);
  }

  @Put('friend/:id')
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'User placed to friends list',
  })
  @UseGuards(JwtAccessGuard)
  async addFriend(
    @Param('id') friendId: string,
    @UserData('sub') userId: string,
  ) {
    return await this.rmqService.send<
      UserAddFriend.Request,
      UserAddFriend.Response
    >(UserAddFriend.topic, {userId, friendId});
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
    @UserData('sub') userId: string,
  ) {
    return await this.rmqService.send<
      UserRemoveFriend.Request,
      UserRemoveFriend.Response
    >(UserRemoveFriend.topic, {userId, friendId});
  }
}
