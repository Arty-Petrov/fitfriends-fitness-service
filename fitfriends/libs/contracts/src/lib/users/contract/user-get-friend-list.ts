import { UserFriendListQuery } from '../query/user-friend-list.query';
import { UserFriendListRdo } from '../rdo/user-friend-list.rdo';

export namespace UserGetFriendList {
  export const topic = 'user.get-friend-list.query';

  export const queue = 'user.get-friend-list';

  export class Request extends UserFriendListQuery { }

  export class Response extends UserFriendListRdo {
  }
}
