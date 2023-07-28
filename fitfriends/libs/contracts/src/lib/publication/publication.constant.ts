import { PublicationCategory } from '@fitfriends/shared-types';

export const PublicationApiError = {
  CategoryIsWrong: `The publication\\'s category must contains any of these values: ${Object.values(PublicationCategory).join(', ')}`,
}

export const PublicationApiDescription = {
  Id: 'The unique publication id',
  AuthorId: 'The uniq publication author id',
  Category: `The publication\\'s category contain any of these values: ${Object.values(PublicationCategory).join(', ')}`,
  EntityId: 'The entity id',
  Title: 'The publication title',
  Description: 'The publication deascription',
}
