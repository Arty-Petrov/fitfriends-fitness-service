import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { IRMQServiceAsyncOptions } from 'nestjs-rmq';

export const rabbitMqOptions = registerAs('rmq', () => ({
  exchange: process.env.RMQ_EXCHANGE,
  user: process.env.RMQ_USER,
  password: process.env.RMQ_PASSWORD,
  host: process.env.RMQ_HOSTNAME,
}));

export const getRabbitMqConfig = (): IRMQServiceAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    exchangeName: configService.get<string>('rmq.exchange'),
    connections: [
      {
        login: configService.get<string>('rmq.user') ?? '',
        password: configService.get<string>('rmq.password') ?? '',

        host: configService.get<string>('rmq.host') ?? '',
      },
    ],
    prefetchCount: 32,
    serviceName: 'fitfriends-api-gateway',
  }),
});
