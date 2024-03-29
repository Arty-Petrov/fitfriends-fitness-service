import { UserFriendsDto } from '../dto/user-friends.dto';
import { UserFriendsRdo } from '../rdo/user-friends.rdo';

export namespace UserSeedFriends {
  export const topic = 'user.seed-friends.command';

  export const queue = 'user.seed-friends';

  export class Request extends Array<UserFriendsDto> { }

  export class Response extends UserFriendsRdo {}
}
