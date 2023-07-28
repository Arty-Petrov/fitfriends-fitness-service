import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoDbOptions from '../config/database.config';
import { mailOptions } from '../config/mail.config';
import { getMongoDbConfig } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { validateEnvironments } from './env.valitation';
import { NoticeModule } from './notice/notice.module';
import { PublicationModule } from './publication/publication.module';
import { SenderModule } from './sender/sender.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MailerModule,
    NoticeModule,
    PublicationModule,
    SenderModule,
    SubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
