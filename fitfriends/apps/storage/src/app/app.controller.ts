import { StorageDeleteFile } from '@fitfriends/contracts';
import { Body, Controller, Get } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly storageService: AppService) { }

  @RMQValidate()
  @RMQRoute(StorageDeleteFile.topic )
  public async delete(@Body() dto: StorageDeleteFile.Request): Promise<void> {
    await this.storageService.delete(dto);
  }
}
