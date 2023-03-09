import { PickType } from '@nestjs/swagger';
import { UserListRdo } from '../rdo/user-list.rdo';
import { UserApi } from '../user.api';

export namespace UserGetFriends {
  export const topic = 'user.get-friends.query';

  export class Request extends PickType(UserApi, ['id']) { }

  export class Response {
    public users: UserListRdo[];
  }
}
