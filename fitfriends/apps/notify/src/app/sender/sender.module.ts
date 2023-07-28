import { RmqModule } from '@fitfriends/rmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMailConfig } from '../../config/mail.config';
import { PublicationModel, PublicationSchema } from '../publication/publication.model';
import { PublicationRepository } from '../publication/publication.repository';
import { PublicationService } from '../publication/publication.service';
import { SubscriberModel, SubscriberSchema } from '../subscriber/subscriber.model';
import { SubscriberRepository } from '../subscriber/subscriber.repository';
import { SubscriberService } from '../subscriber/subscriber.service';
import { SenderMailService } from './sender-mail.service';
import { SenderController } from './sender.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SubscriberModel.name,
        schema: SubscriberSchema
      },
      {
        name: PublicationModel.name,
        schema: PublicationSchema,
      },
    ]),
    MailerModule.forRootAsync(getMailConfig()),
    RmqModule,
  ],
  controllers: [SenderController],
  providers: [
    SenderMailService,
    SubscriberService,
    SubscriberRepository,
    PublicationService,
    PublicationRepository,
  ],
  exports: [SenderMailService],
})
export class SenderModule {}
