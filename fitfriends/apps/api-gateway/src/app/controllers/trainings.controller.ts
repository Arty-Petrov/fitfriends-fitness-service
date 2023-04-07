import {
  TrainingCardRdo,
  TrainingCreate,
  TrainingGetList,
  TrainingGetOne,
  TrainingUpdateData,
  TrainingUpdateImage,
  TrainingUpdateVideo,
  UserCardRdo,
  UserListQuery,
} from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { UserRole } from '@fitfriends/shared-types';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
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

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('image')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training image is uploaded',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor(UploadField.TrainingImage, MulterOptions.TrainingImage))
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return { image: file.path }
  }

  @Post('video')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training video is uploaded',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor(UploadField.TrainingVideo, MulterOptions.TrainingVideo))
  public async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return { video: file.path }
  }

  @Post()
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training created',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async create(
    @UserData('sub') id: string,
    @Body() dto: TrainingCreate.Request,
  ): Promise<TrainingCreate.Response> {
    return await this.rmqService.send<TrainingCreate.Request, TrainingCreate.Response>(
      TrainingCreate.topic,
      { ...dto, authorId: id }
    );
  }

  @Get(':id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training is found',
  })
  @UseGuards(JwtAccessGuard)
  async getOne(
    @Param('id') id: number,
  ): Promise<TrainingGetOne.Response> {
    return await this.rmqService.send<TrainingGetOne.Request, TrainingGetOne.Response>(
      TrainingGetOne.topic,
      { id }
    );
  }

  @Get()
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Trainings is found',
  })
  @UseGuards(JwtAccessGuard)
  async getList(
    @Query() dto: UserListQuery,
  ): Promise<TrainingGetList.Response> {
    return await this.rmqService.send<TrainingGetList.Request, TrainingGetList.Response>(
      TrainingGetList.topic, dto);
  }

  @Patch('image/:id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training image is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor(UploadField.TrainingImage, MulterOptions.TrainingImage))
  public async updateImage(
    @Param('id') trainingId: number,
    @UploadedFile() file: Express.Multer.File,
    @UserData('sub') userId: string,
  ): Promise<TrainingUpdateImage.Response> {
    const dto = {
      id: trainingId,
      image: file.path,
      authorId: userId,
    }
    return await this.rmqService.send<
      TrainingUpdateImage.Request,
      TrainingUpdateImage.Response
    >(TrainingUpdateImage.topic, dto);
  }

  @Patch('video/:id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training video is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor(UploadField.TrainingVideo, MulterOptions.TrainingVideo))
  public async updateVideo(
    @Param('id') trainingId: number,
    @UploadedFile() file: Express.Multer.File,
    @UserData('sub') userId: string,
  ): Promise<TrainingUpdateVideo.Response> {
    const dto = {
      id: trainingId,
      video: file.path,
      authorId: userId,
    }
    return await this.rmqService.send<
      TrainingUpdateVideo.Request,
      TrainingUpdateVideo.Response
    >(TrainingUpdateVideo.topic, dto);
  }

  @Patch()
  @ApiResponse({
    type: UserCardRdo,
    status: HttpStatus.OK,
    description: 'Training data placed is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async addFriend(
    @Body() dto: TrainingUpdateData.Request,
    @UserData('sub') userId: string,
  ): Promise<TrainingUpdateData.Response> {
    return await this.rmqService.send<
      TrainingUpdateData.Request,
      TrainingUpdateData.Response
    >(TrainingUpdateData.topic, { ...dto, authorId: userId });
  }
}
