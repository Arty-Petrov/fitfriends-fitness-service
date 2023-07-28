import { SenderSendUnsubscriptionDto } from '../dto/sender-send-unsubscription.dto';

export namespace SenderSendUnsubscription {
  export const topic = 'sender.send-unsubscription.command';

  export const queue = 'sender.send-unsubscription';

  export class Request extends SenderSendUnsubscriptionDto { }

  export class Response { }
}
