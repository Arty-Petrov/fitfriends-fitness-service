import { UserUploadAvatarDto } from '../dto/user-upload-avatar.dto';
import { UserUploadAvatarRdo } from '../rdo/user-upload-avatar.rdo';

export namespace UserUploadAvatar {
  export const topic = 'user.upload-avatar.command';

  export const queue = 'user.upload-avatar';

  export class Request extends UserUploadAvatarDto { }

  export class Response extends UserUploadAvatarRdo { }
}
