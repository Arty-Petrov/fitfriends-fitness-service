import { UserLogoutDto } from '../dto/user-logout.dto';

export namespace UserLogout {
  export const topic = 'user.logout.command';

  export class Request extends UserLogoutDto{ }

  export class Response { }
}
