import { Expose } from 'class-transformer';

export class UserSignedRdo {
  @Expose()
  public access_token: string;

  @Expose()
  public refresh_token: string;
}

