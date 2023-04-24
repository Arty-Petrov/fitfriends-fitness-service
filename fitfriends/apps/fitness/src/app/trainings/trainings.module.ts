import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [RmqModule],
  controllers: [TrainingsController],
  providers: [
    TrainingsController,
    TrainingsRepository,
    TrainingsService,
    { provide: 'SERVICE', useClass: TrainingsService },
  ],
})
export class TrainingsModule { }
