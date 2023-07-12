import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { FITNESS_SERVICE_ENV_PATH } from './app.constant';
import { validateEnvironments } from './env.valitation';
import { GymsModule } from './gyms/gyms.module';
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
    GymsModule,
    OrdersModule,
    PrismaModule,
    ReviewsModule,
    TrainingsModule,
  ],
  controllers: [],
  providers: [],
}) 
export class AppModule { }
