import { Publication, PublicationCategory } from '@fitfriends/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PUBLICATION_COLLECTION_NAME } from '../app.constant';

@Schema({
  collection: PUBLICATION_COLLECTION_NAME,
  id: true,
  timestamps: true,
})
export class PublicationModel extends Document implements  Publication {
  @Prop()
  public authorId: string;

  @Prop({
    required: true,
    type: String,
    enum: PublicationCategory,
  })
  public category: PublicationCategory;

  @Prop()
  public entityId: number;

  @Prop()
  public title: string;

  @Prop()
  public description: string;
}

export const PublicationSchema = SchemaFactory.createForClass(PublicationModel);
