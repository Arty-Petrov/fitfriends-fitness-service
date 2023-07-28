import { PublicationListQuery } from '../query/publication-list.query';
import { PublicationRdo } from '../rdo/publication.rdo';

export namespace PublicationGetList {
  export const topic = 'publication.get-list.query';

  export const queue = 'publication.get-list';

  export class Request extends PublicationListQuery { }

  export class Response extends PublicationRdo { }
}
