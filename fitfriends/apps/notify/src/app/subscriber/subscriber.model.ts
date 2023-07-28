import { Subscriber } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SUBSCRIBER_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: SUBSCRIBER_COLLECTION_NAME,
  id: true,
  timestamps: true,
})
export class SubscriberModel extends Document implements Subscriber {
  @Prop()
  public publisherId: string;

  @Prop()
  public publisherEmail: string;

  @Prop()
  public publisherName: string;

  @Prop()
  public subscriberId: string;

  @Prop()
  public subscriberEmail: string;

  @Prop()
  public subscriberName: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(SubscriberModel);
