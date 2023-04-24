import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { CLI_APP_ENV_PATH } from './app.constant';
import { SeedCommand } from './commands/seed.command';
import { validateEnvironments } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: CLI_APP_ENV_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
		RmqModule,
  ],
  providers: [SeedCommand],
})
export class AppModule {}
