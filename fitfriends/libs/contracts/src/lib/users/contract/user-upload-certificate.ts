import { UserUploadCertificateDto } from '../dto/user-upload-certificate.dto';
import { UserRdo } from '../rdo/user.rdo';

export namespace UserUploadCertificate {
  export const topic = 'user.upload-certificate.command';

  export class Request extends UserUploadCertificateDto { }

  export class Response extends UserRdo { }
}
