import { SubscriberDeleteDto } from '../dto/subscriber-delete.dto';

export namespace SubscriberDelete {
  export const topic = 'subscriber.delete.command';

  export const queue = 'subscriber.delete';

  export class Request extends SubscriberDeleteDto { }

  export class Response { }
}
