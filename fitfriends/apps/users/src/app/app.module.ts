import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import { jwtOptions } from '../config/jwt.config';
import { getMongoDbConfig } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { USER_SERVICE_ENV_PATH } from './app.constant';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './env.validation';
import { UserFriendsModule } from './friends/user-friends.module';
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
		AuthModule,
		UserModule,
    UserFriendsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
