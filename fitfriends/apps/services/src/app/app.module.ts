import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { SERVICES_SERVICE_ENV_PATH } from './app.constant';
import { validateEnvironments } from './env.valitation';
import { PrismaModule } from './prisma/prisma.module';
import { TrainingsModule } from './trainings/trainings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: SERVICES_SERVICE_ENV_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
    PrismaModule,
    RMQModule.forRootAsync(getRabbitMqConfig()),
    TrainingsModule,
  ],
  controllers: [],
  providers: [],
}) 
export class AppModule { }
