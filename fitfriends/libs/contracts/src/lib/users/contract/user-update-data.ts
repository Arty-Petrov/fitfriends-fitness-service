import { UserUpdateDataDto } from '../dto/user-update-data.dto';

export namespace UserUpdateData {
  export const topic = 'user.update-data.command';

  export class Request extends UserUpdateDataDto { }

  export class Response extends UserRdo { }
}
