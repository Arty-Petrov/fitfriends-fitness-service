import { WorkoutInviteSendDto } from '../dto/workout-invite-send.dto';

export namespace WorkoutInviteSend {
  export const topic = 'workout-invite.send.command';

  export const queue = 'workout-invite.send';

  export class Request extends WorkoutInviteSendDto { }

  export class Response { }
}
