import { PublicationCategory } from './publication-category.enum';

export interface Publication {
  id?: string;
  authorId: string;
  category: PublicationCategory;
  entityId: number;
  title: string;
  description: string;
}
