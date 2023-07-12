import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';
import { OrdersRepository } from '../orders/orders.repository';
import { TrainingsController } from './trainings.controller';
import { TrainingsRepository } from './trainings.repository';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [RmqModule, OrdersModule],
  controllers: [TrainingsController],
  providers: [
    TrainingsController,
    TrainingsRepository,
    TrainingsService,
    OrdersRepository,
    { provide: 'OWNER_SERVICE', useClass: TrainingsService },
  ],
  exports: [TrainingsRepository],
})
export class TrainingsModule { }
