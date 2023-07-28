import { PublicationDeleteSentDto } from '../dto/publication-delete-sent.dto';

export namespace PublicationDeleteSent {
  export const topic = 'publication.delete-sent.command';

  export const queue = 'publication.delete-sent';

  export class Request extends Array<PublicationDeleteSentDto> { }

  export class Response { }
}
