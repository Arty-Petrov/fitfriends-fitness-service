import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { FITNESS_SERVICE_ENV_PATH } from './app.constant';
import { validateEnvironments } from './env.valitation';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TrainingsModule } from './trainings/trainings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: FITNESS_SERVICE_ENV_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
    PrismaModule,
    RMQModule.forRootAsync(getRabbitMqConfig()),
    OrdersModule,
    ReviewsModule,
    TrainingsModule,
  ],
  controllers: [],
  providers: [],
}) 
export class AppModule { }
