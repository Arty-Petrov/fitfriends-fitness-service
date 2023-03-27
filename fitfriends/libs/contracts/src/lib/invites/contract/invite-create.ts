import { InviteCreateDto } from '../dto/invite-create.dto';
import { InviteCardRdo } from '../rdo/invite-card.rdo';

export namespace InviteCreate {
  export const topic = 'invite.create.command';

  export class Request extends InviteCreateDto { }

  export class Response extends InviteCardRdo { }
}
