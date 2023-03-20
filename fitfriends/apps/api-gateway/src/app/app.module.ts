import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { API_GATEWAY_APP_ENV_PATH } from './app.constant';
import { AuthController } from './controllers/auth.controller';
import { UploadController } from './controllers/upload.controller';
import { validateEnvironments } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: API_GATEWAY_APP_ENV_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
    RMQModule.forRootAsync(getRabbitMqConfig()),
  ],
  controllers: [AuthController, UploadController],
  providers: [],
})
export class AppModule { }
