import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { GymsController } from './gyms.controller';
import { GymsRepository } from './gyms.repository';
import { GymsService } from './gyms.service';

@Module({
  imports: [RmqModule],
  controllers: [GymsController],
  providers: [
    GymsController,
    GymsRepository,
    GymsService,
    { provide: 'EXISTS_SERVICE', useClass: GymsService },],
  exports: [GymsRepository],
})
export class GymsModule { }
