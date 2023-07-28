import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig, jwtOptions } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { API_GATEWAY_APP_ENV_PATH } from './app.constant';
import { AuthController } from './controllers/auth.controller';
import { FeedController } from './controllers/feed.controller';
import { GymsController } from './controllers/gyms.controller';
import { MyController } from './controllers/my.controller';
import { NoticeController } from './controllers/notice.controller';
import { OrdersController } from './controllers/orders.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { SenderController } from './controllers/sender.controller';
import { SubscriberController } from './controllers/subscriber.controller';
import { TrainingsController } from './controllers/trainings.controller';
import { UsersController } from './controllers/user.controller';
import { validateEnvironments } from './env.validation';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: API_GATEWAY_APP_ENV_PATH,
      load: [rabbitMqOptions, jwtOptions],
      validate: validateEnvironments,
    }),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
    RmqModule,
  ],
  controllers: [
    AuthController,
    FeedController,
    GymsController,
    MyController,
    NoticeController,
    OrdersController,
    ReviewsController,
    TrainingsController,
    UsersController,
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule { }
