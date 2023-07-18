import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';

@Module({
  imports: [RmqModule],
  controllers: [FeedController],
  providers: [
    FeedRepository,
    FeedService,
    { provide: 'OWNER_SERVICE', useClass: FeedService },
    { provide: 'EXISTS_SERVICE', useClass: FeedService },
  ],
  exports: [],
})
export class FeedModule { }
