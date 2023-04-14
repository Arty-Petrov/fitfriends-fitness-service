import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TrainingUpdateImageDto } from '../dto/training-update-image.dto';
import { TrainingApi } from '../training.api';

export namespace TrainingUpdateImage {
  export const topic = 'training.update-image.command';

  export class Request extends TrainingUpdateImageDto { }

  export class Response extends PickType(TrainingApi, ['image']) {
   @Expose()
   public image: string;
  }
}
