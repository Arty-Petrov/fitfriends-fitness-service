import { Expose } from 'class-transformer';

export class UserLoggedRdo {
  @Expose()
  public access_token: string;
  
  @Expose()
  public refresh_token: string;
}

