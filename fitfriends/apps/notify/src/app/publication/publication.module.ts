import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationController } from './publication.controller';
import { PublicationModel, PublicationSchema } from './publication.model';
import { PublicationRepository } from './publication.repository';
import { PublicationService } from './publication.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PublicationModel.name,
        schema: PublicationSchema,
      },
    ]),
    RmqModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationRepository, PublicationService],
  exports: [PublicationRepository],
})
export class PublicationModule { }
