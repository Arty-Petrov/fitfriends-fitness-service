import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RMQModule } from 'nestjs-rmq';
import databaseConfig from '../config/database.config';
import { jwtOptions } from '../config/jwt.config';
import { getMongoDbConfig } from '../config/mongodb.config';
import { getRabbitMqConfig, rabbitMqOptions } from '../config/rabbitmq.config';
import { USER_SERVICE_ENV_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './env.validation';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: USER_SERVICE_ENV_PATH,
			load: [databaseConfig, rabbitMqOptions, jwtOptions],
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
