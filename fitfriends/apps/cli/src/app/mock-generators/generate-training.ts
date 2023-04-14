import { faker } from '@faker-js/faker';
import {
  TrainingCreateDto,
  TrainingDescriptionLength,
  TrainingTitleLength,
  UserCaloriesLoss,
} from '@fitfriends/contracts';
import { TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';
import { TrainingMock } from './mock.constatns';

export const generateTraining = (authorId: string): TrainingCreateDto => {
  faker.locale = 'ru';
  return {
    title: faker.commerce.productName().slice(0, TrainingTitleLength.Max),
    image: TrainingMock.Image,
    experience: faker.helpers.objectValue(UserExperience),
    type: faker.helpers.objectValue(TrainingType),
    duration: faker.helpers.objectValue(TrainingDuration),
    price: faker.datatype.number({ max: TrainingMock.MaxPrice }),
    caloriesLoss: faker.datatype.number({
      min: UserCaloriesLoss.Min,
      max: UserCaloriesLoss.Max,
    }),
    description: faker.commerce
      .productDescription()
      .slice(0, TrainingDescriptionLength.Max),
    gender: faker.helpers.objectValue(UserGender),
    video: TrainingMock.Video,
    authorId: authorId,
    isSpecialOffer: faker.datatype.boolean(),
  };
};
