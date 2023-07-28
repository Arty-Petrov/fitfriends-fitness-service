import { Subscriber } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsString } from 'class-validator';
import { SubscriberApiDescription } from './subscriber.constant';

export class SubscriberApi implements Subscriber{
  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.Id,
  })
  @IsMongoId()
  public id?: string;

  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.PublisherId,
  })
  @IsMongoId()
  public publisherId: string;

    @ApiProperty({
    required: true,
    description: SubscriberApiDescription.PublisherEmail,
  })
  @IsEmail()
  public publisherEmail: string;

  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.PublisherName,
  })
  @IsString()
 public publisherName: string;

  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.SubscriberId,
  })
  @IsMongoId()
  public subscriberId: string;

  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.SubscriberEmail,
  })
  @IsEmail()
  subscriberEmail: string;

  @ApiProperty({
    required: true,
    description: SubscriberApiDescription.SubscriberName,
  })
  @IsString()
  subscriberName: string;
}
