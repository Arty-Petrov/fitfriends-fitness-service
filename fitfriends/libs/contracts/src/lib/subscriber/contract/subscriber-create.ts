import { SubscriberCreateDto } from '../dto/subscriber-create.dto';

export namespace SubscriberCreate {
  export const topic = 'subscriber.create.command';

  export const queue = 'subscriber.create';

  export class Request extends SubscriberCreateDto { }

  export class Response { }
}
