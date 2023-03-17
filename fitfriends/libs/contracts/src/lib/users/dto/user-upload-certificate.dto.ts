import { PickType } from '@nestjs/swagger';
import { UserApi } from '../user.api';

export class UserUploadCertificateDto extends PickType(UserApi, [
  'certificate',
]) {}
