import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RMQService } from 'nestjs-rmq';
import { MulterOptions } from '../../config/multer.config';

@Controller('upload')
export class UploadController {
  constructor(private readonly rmqService: RMQService) { }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', MulterOptions.Avatar))
  public async uploadAvatar(@UploadedFile() file: any, @Body() dto: any): Promise<void> {
    console.log('file ', { ...file }, 'body ', { ...dto });

    // const dto: UserUploadAvatarDto = {
    //   avatar: {
    //     url: file.path,
    //     name: file.filename,
    //   },
    // };
    // try {
    //   return await this.rmqService.send<UserUploadAvatar.Request, UserUploadAvatar.Response>(UserUploadAvatar.topic, dto, { headers: { requestId: 'someRequestId' } });
    // } catch (error) {
    //   if (error instanceof Error) {
    //     throw new UnauthorizedException(error.message);
    //   }
    // }
  }
}
