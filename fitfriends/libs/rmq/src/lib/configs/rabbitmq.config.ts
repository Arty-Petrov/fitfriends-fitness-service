import { getRabbitConnectionString } from '@fitfriends/core';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { Exchanges } from '../exchanges';

export const getRabbitMqConfig = (): AsyncModuleConfig<RabbitMQConfig> => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    name: configService.get<string>('rmq.serviceName'),
    exchanges: Object.values(Exchanges),
    uri: getRabbitConnectionString({
      username: configService.get<string>('rmq.user'),
      password: configService.get<string>('rmq.password'),
      host: configService.get<string>('rmq.host'),
      port: configService.get<string>('rmq.port'),
    }),
    connectionInitOptions: { wait: false },
    enableControllerDiscovery: true,
    prefetchCount: 32,
  }),
});
