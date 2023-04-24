import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  imports: [RmqModule],
  controllers: [OrdersController],
  providers: [OrdersRepository, OrdersService],
  exports: [],
})
export class OrdersModule { }
