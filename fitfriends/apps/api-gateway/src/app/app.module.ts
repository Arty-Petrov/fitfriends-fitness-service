import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig, jwtOptions } from '../config/jwt.config';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { API_GATEWAY_APP_ENV_PATH } from './app.constant';
import { AuthController } from './controllers/auth.controller';
import { MyController } from './controllers/my.controller';
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
    RMQModule.forRootAsync(getRabbitMqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
  controllers: [AuthController, MyController, TrainingsController, UsersController],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AppModule { }
