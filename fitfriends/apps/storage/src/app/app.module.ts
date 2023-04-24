import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { STORAGE_SERVICE_ENV_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnvironments } from './env.validation';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: STORAGE_SERVICE_ENV_PATH,
			load: [rabbitMqOptions],
			validate: validateEnvironments,
		}),
		RmqModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
