import { UserListQuery } from '../query/user-list.query';
import { UserListRdo } from '../rdo/user-list.rdo';

export namespace UserGetList {
  export const topic = 'user.get-list.query';

  export class Request extends UserListQuery { }

  export class Response {
    public users: UserListRdo[];
  }
}
