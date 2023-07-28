import { WorkoutInviteAnswerDto } from '../dto/workout-invite-answer.dto';

export namespace WorkoutInviteAnswer {
  export const topic = 'workout-invite.answer.command';

  export const queue = 'workout-invite.answer';

  export class Request extends WorkoutInviteAnswerDto { }

  export class Response { }
}
