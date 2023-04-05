import { UserUpdateFriendListDto } from '../dto/user-update-friend-list.dto';
import { UserCardRdo } from '../rdo/user-card.rdo';

export namespace UserAddFriend {
  export const topic = 'user.add-friend.command';

  export class Request extends UserUpdateFriendListDto { }

  export class Response extends UserCardRdo{}
}
