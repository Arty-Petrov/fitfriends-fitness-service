import { Controller } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';

@Controller('upload')
export class UploadController {
  constructor(private readonly rmqService: RMQService) { }

}
