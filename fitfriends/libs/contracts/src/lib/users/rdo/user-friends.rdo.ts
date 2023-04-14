import { Expose } from 'class-transformer';

export class UserFriendsRdo {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public friendIds: string[];
}
