import { UserSignUpDto } from '../dto/user-sign-up.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserCreateMany {
  export const topic = 'user.create-many.command';

  export const queue = 'user.create-many';

  export class Request extends Array<UserSignUpDto> { }

  export class Response extends UserRdo { }
}
