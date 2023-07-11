import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { GymsRepository } from '../gyms/gyms.repository';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [RmqModule],
  controllers: [OrdersController],
  providers: [
    GymsRepository,
    TrainingsRepository,
    OrdersRepository,
    OrdersService,
    { provide: 'OWNER_SERVICE', useClass: OrdersService },
  ],
  exports: [OrdersRepository],
})
export class OrdersModule { }
