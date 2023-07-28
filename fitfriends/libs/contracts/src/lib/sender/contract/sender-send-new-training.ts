import { SenderSendNewTrainingDto } from '../dto/sender-send-new-training.dto';

export namespace SenderSendNewTraining {
  export const topic = 'sender.send-new-training.command';

  export const queue = 'sender.send-new-training';

  export class Request extends SenderSendNewTrainingDto { }

  export class Response { }
}
