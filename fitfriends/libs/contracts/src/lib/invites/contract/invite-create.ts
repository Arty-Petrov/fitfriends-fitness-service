import { InviteCreateDto } from '../dto/invite-create.dto';
import { InviteCardRdo } from '../rdo/invite-card.rdo';

export namespace InviteCreate {
  export const topic = 'invite.create.command';

  export const queue = 'invite.create';

  export class Request extends InviteCreateDto { }

  export class Response extends InviteCardRdo { }
}
