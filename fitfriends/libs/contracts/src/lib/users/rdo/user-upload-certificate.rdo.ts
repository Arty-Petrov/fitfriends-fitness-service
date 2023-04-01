import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserApi } from '../user.api';

export class UserUploadCertificateRdo extends PickType(UserApi, [
  'certificate',
]) {
  @Expose()
  public certificate: string;
}
