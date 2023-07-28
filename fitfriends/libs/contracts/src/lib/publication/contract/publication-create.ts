import { PublicationCreateDto } from '../dto/publication-create.dto';

export namespace PublicationCreate {
  export const topic = 'publication.create.command';

  export const queue = 'publication.create';

  export class Request extends PublicationCreateDto { }

  export class Response { }
}
