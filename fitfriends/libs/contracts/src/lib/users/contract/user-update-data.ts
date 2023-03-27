import { UserUpdateDataDto } from '../dto/user-update-data.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserUpdateData {
  export const topic = 'user.update-data.command';

  export class Request extends UserUpdateDataDto { }

  export class Response extends UserRdo { }
}
