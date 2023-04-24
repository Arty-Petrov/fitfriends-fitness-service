import { StorageDeleteFile } from '@fitfriends/contracts';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly storageService: AppService) { }

  @RabbitRPC({
    exchange: Exchanges.storage.name,
    routingKey: StorageDeleteFile.topic,
    queue: StorageDeleteFile.queue,
    errorHandler: rmqErrorCallback,
  })
  public async delete(dto: StorageDeleteFile.Request): Promise<void> {
    await this.storageService.delete(dto);
  }
}
