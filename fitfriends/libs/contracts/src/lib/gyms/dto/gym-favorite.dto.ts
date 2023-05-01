import { IsMongoId, IsNumber } from 'class-validator';

export class GymFavoriteDto {
  @IsMongoId()
  public userId: string;

  @IsNumber()
  public itemId: number;
}
