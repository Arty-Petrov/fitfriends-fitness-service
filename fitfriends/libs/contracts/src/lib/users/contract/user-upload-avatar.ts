import { UserUploadAvatarDto } from '../dto/user-upload-avatar.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserUploadAvatar {
  export const topic = 'user.upload-avatar.command';

  export class Request extends UserUploadAvatarDto { }

  export class Response extends UserRdo { }
}
