import { UserRegisterDto } from '../dto/user-register.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserRegister {
  export const topic = 'user.register.command';

  export class Request extends UserRegisterDto { }

  export class Response extends UserRdo { }
}
