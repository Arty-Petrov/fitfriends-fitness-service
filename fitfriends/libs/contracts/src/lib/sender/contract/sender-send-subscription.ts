import { SenderSendSubscriptionDto } from '../dto/sender-send-subscription.dto';

export namespace SenderSendSubscription {
  export const topic = 'sender.send-subscription.command';

  export const queue = 'sender.send-subscribtion';

  export class Request extends SenderSendSubscriptionDto { }

  export class Response { }
}
