import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RMQModule } from 'nestjs-rmq';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_SERVICE_ENV_PATH } from './app.constant';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironments } from './env.validation';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import databaseConfig from '../config/database.config';
import { getMongoDbConfig } from '../config/mongodb.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: USER_SERVICE_ENV_PATH,
			load: [databaseConfig, rabbitMqOptions],
			validate: validateEnvironments,
		}),
		MongooseModule.forRootAsync(getMongoDbConfig()),
		RMQModule.forRootAsync(getRabbitMqConfig()),
		AuthModule,
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
