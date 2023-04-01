import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserApi } from '../user.api';

export class UserUploadCertificateDto extends PickType(UserApi, [
  'id',
  'certificate',
]) {
  @IsOptional()
  public id: string;
}
