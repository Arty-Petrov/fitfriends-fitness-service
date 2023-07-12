import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [RmqModule],
  controllers: [ReviewsController],
  providers: [ReviewsRepository, ReviewsService, TrainingsRepository],
})
export class ReviewsModule { }
