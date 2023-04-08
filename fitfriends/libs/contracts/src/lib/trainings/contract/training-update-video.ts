import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingUpdateVideoDto } from '../dto/training-update-video.dto';
import { TrainingApi } from '../training.api';

export namespace TrainingUpdateVideo {
  export const topic = 'training.update-video.command';

  export class Request extends TrainingUpdateVideoDto { }

  export class Response extends PickType(TrainingApi, ['video']) {
   @Expose()
   public video: string;
  }
}
