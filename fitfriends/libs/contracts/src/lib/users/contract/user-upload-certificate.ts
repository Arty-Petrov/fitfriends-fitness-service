import { UserUploadCertificateDto } from '../dto/user-upload-certificate.dto';
import { UserUploadCertificateRdo } from '../rdo/user-upload-certificate.rdo';

export namespace UserUploadCertificate {
  export const topic = 'user.upload-certificate.command';

  export class Request extends UserUploadCertificateDto { }

  export class Response extends UserUploadCertificateRdo { }
}
