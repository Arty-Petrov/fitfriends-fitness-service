import { getRabbitConnectionString } from '@fitfriends/core';
import { Exchanges } from '@fitfriends/rmq';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService, registerAs } from '@nestjs/config';

export const rabbitMqOptions = registerAs('rmq', () => ({
  serviceName: process.env.RMQ_SERVICE_NAME,
  user: process.env.RMQ_USER,
  password: process.env.RMQ_PASSWORD,
  host: process.env.RMQ_HOST,
  port: process.env.RMQ_PORT,
}));

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
    connectionInitOptions: { wait: true },
    prefetchCount: 32,
  }),
});
