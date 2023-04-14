import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const rabbitMqOptions = registerAs('rmq', () => ({
  serviceName: process.env.RMQ_SERVICE_NAME,
  exchange: process.env.RMQ_EXCHANGE,
  user: process.env.RMQ_USER,
  password: process.env.RMQ_PASSWORD,
  host: process.env.RMQ_HOST_NAME,
  queue: process.env.RMQ_FITNESS_QUEUE,
}));

export const getRabbitMqConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get<string>('rmq.exchange'),
    connections: [
      {
        login: configService.get<string>('rmq.user'),
        password: configService.get<string>('rmq.password'),

        host: configService.get<string>('rmq.host'),
      },
    ],
    queueName: configService.get<string>('rmq.queue'),
    prefetchCount: 32,
    serviceName: configService.get<string>('rmq.serviceName'),
  }),
});
