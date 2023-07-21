import {
  TrainingCardRdo,
  TrainingCreate,
  TrainingGetList,
  TrainingGetOne,
  TrainingUpdateData,
  TrainingUpdateImage,
  TrainingUpdateVideo,
} from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { Exchanges } from '@fitfriends/rmq';
import { UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
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
import { MulterOptions } from '../../config/multer.config';
import { Roles } from '../decorators/roles.decorator';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('image')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training image is uploaded',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor(UploadField.TrainingImage, MulterOptions.TrainingImage)
  )
  public async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { image: file.path };
  }

  @Post('video')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training video is uploaded',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor(UploadField.TrainingVideo, MulterOptions.TrainingVideo)
  )
  public async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return { video: file.path };
  }

  @Post()
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training created',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async createTraining(
    @UserData('sub') id: string,
    @Body() dto: TrainingCreate.Request
  ): Promise<TrainingCreate.Response> {
    return await this.amqpConnection.request<TrainingCreate.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingCreate.topic,
      payload: { ...dto, authorId: id },
    });
  }


  @Get(':id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training is found',
  })
  @UseGuards(JwtAccessGuard)
  async getOne(
    @Param('id') trainingId: number,
    @UserData('sub') userId: string,
    @UserData('role') userRole: UserRole,
  ): Promise<TrainingGetOne.Response> {
    return await this.amqpConnection.request<TrainingGetOne.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingGetOne.topic,
      payload: {
        id: trainingId,
        userId: userId,
        role: userRole,
      },
    });
  }

  @Get()
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Trainings is found',
  })
  @UseGuards(JwtAccessGuard)
  async getList(
    @Query() query: TrainingGetList.Request
  ): Promise<TrainingGetList.Response> {
    return await this.amqpConnection.request<TrainingGetList.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingGetList.topic,
      payload: query,
    });
  }

  @Patch('image/:id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training image is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor(UploadField.TrainingImage, MulterOptions.TrainingImage)
  )
  public async updateImage(
    @Param('id') trainingId: number,
    @UploadedFile() file: Express.Multer.File,
    @UserData('sub') userId: string
  ): Promise<TrainingUpdateImage.Response> {
    return await this.amqpConnection.request<TrainingUpdateImage.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingUpdateImage.topic,
      payload: {
        id: trainingId,
        image: file.path,
        authorId: userId,
      },
    });
  }

  @Patch('video/:id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training video is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor(UploadField.TrainingVideo, MulterOptions.TrainingVideo)
  )
  public async updateVideo(
    @Param('id') trainingId: number,
    @UploadedFile() file: Express.Multer.File,
    @UserData('sub') userId: string
  ): Promise<TrainingUpdateVideo.Response> {
    return await this.amqpConnection.request<TrainingUpdateVideo.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingUpdateVideo.topic,
      payload: {
        id: trainingId,
        video: file.path,
        authorId: userId,
      },
    });
  }

  @Patch(':id')
  @ApiResponse({
    type: TrainingCardRdo,
    status: HttpStatus.OK,
    description: 'Training data is updated',
  })
  @Roles(UserRole.Coach)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async updateData(
    @Param('id') trainingId: number,
    @Body() dto: TrainingUpdateData.Request,
    @UserData('sub') userId: string
  ): Promise<TrainingUpdateData.Response> {
    return await this.amqpConnection.request<TrainingUpdateData.Response>({
      exchange: Exchanges.trainings.name,
      routingKey: TrainingUpdateData.topic,
      payload: {
        ...dto,
        id: trainingId,
        authorId: userId,
      },
    });
  }
}
