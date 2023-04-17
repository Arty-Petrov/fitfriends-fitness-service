import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsService } from './trainings.service';

@Module({
  controllers: [TrainingsController],
  providers: [
    TrainingsRepository,
    TrainingsService,
    { provide: 'SERVICE', useClass: TrainingsService },
  ],
  exports: [],
})
export class TrainingsModule { }
