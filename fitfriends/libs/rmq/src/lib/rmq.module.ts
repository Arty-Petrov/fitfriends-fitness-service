import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { getRabbitMqConfig } from './configs/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMqConfig())
  ],
  exports: [RabbitMQModule],
})
export class RmqModule {
}
