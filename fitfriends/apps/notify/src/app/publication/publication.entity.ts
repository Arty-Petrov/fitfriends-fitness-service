import { Entity, Publication, PublicationCategory } from '@fitfriends/shared-types';

export class PublicationEntity
  implements Entity<PublicationEntity>, Publication
{
  public id: string;
  public authorId: string;
  public category: PublicationCategory;
  public entityId: number;
  public title: string;
  public description: string;

  constructor(item: Publication) {
    this.fillEntity(item);
  }

  public toObject(): PublicationEntity {
    return { ...this };
  }

  public fillEntity(entity: Publication) {
    this.id = entity?.id;
    this.authorId = entity.authorId;
    this.category = entity.category;
    this.entityId = entity.entityId;
    this.title = entity.title;
    this.description = entity.description;
  }
}
