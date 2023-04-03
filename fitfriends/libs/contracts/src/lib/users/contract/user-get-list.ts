import { UserListQuery } from '../query/user-list.query';
import { UserCardRdo } from '../rdo/user-card.rdo';

export namespace UserGetList {
  export const topic = 'user.get-list.query';

  export class Request extends UserListQuery { }

  export class Response extends UserCardRdo {
  }
}
