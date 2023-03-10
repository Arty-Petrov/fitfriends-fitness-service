import { GymFeature, SubwayStation } from '@fitfriends/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { GymApi } from '../gym.api';

export class GymUpdateDataDto extends PickType(GymApi, ['id', 'name', 'location', 'isVerifyed', 'features', 'photos', 'description', 'price']) {
  @ApiProperty({
    required: true,
  })
  public id: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public location: SubwayStation;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public isVerifyed: boolean;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public features: GymFeature[];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public photos: string[];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public description: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public price: number;
}
