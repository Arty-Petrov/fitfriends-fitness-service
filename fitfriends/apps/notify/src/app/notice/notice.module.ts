import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticeController } from './notice.controller';
import { NoticeModel, NoticeSchema } from './notice.model';
import { NoticeRepository } from './notice.repository';
import { NoticeService } from './notice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: NoticeModel.name,
        schema: NoticeSchema,
      },
    ]),
    RmqModule,
  ],
  controllers: [NoticeController],
  providers: [NoticeRepository, NoticeService],
  exports: [NoticeRepository],
})
export class NoticeModule { }
