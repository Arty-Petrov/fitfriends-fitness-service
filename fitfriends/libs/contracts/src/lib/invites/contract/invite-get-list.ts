import { InviteGetListQuery } from '../query/invite-get-list.query';
import { InviteCardRdo } from '../rdo/invite-card.rdo';

export namespace InviteGetList {
  export const topic = 'invite.get-list.command';

  export const queue = 'invite.get-list';

  export class Request extends InviteGetListQuery { }

  export class Response extends InviteCardRdo { }
}
