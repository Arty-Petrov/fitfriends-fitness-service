import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModel, PublicationSchema } from '../publication/publication.model';
import { PublicationRepository } from '../publication/publication.repository';
import { PublicationService } from '../publication/publication.service';
import { SenderMailService } from '../sender/sender-mail.service';
import { SubscriberController } from './subscriber.controller';
import { SubscriberModel, SubscriberSchema } from './subscriber.model';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';

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
    RmqModule,
  ],
  controllers: [SubscriberController],
  providers: [
    SubscriberService,
    SubscriberRepository,
    SenderMailService,
    PublicationService,
    PublicationRepository
  ],
  exports: [
    SubscriberService,
    SubscriberRepository
  ],
})
export class SubscriberModule {}
