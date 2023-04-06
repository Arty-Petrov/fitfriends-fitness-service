import { UserUpdateFriendListDto } from '../dto/user-update-friend-list.dto';

export namespace UserRemoveFriend {
  export const topic = 'user.remove-friend.command';

  export class Request extends UserUpdateFriendListDto { }

  export class Response {}
}
