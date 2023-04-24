import { UserFriendListQuery } from '../query/user-friend-list.query';
import { UserCardRdo } from '../rdo/user-card.rdo';

export namespace UserGetFriendList {
  export const topic = 'user.get-friend-list.query';

  export const queue = 'user.get-friend-list';

  export class Request extends UserFriendListQuery { }

  export class Response extends UserCardRdo {
  }
}
