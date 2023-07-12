import { SortOrder, TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';

export const TRAINING_IMAGE_FILE_MAX_SIZE = 1024000;
export const TRAINING_IMAGE_FILE_TYPE_REGEXP = /\/(jpg|jpeg|png)$/;

export const TRAINING_VIDEO_FILE_TYPE_REGEXP = /\/(quicktime|mov|avi|mp4)$/;
export const TRAINING_VIDEO_FILE_MAX_SIZE = 104857600000;

export const DEFAULT_TRAININGS_PAGINATION_COUNT = 1;
export const DEFAULT_TRAININGS_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_TRAININGS_COUNT_LIMIT = 50;

export const TRAININGS_RATING_DECIMALS = 1;

export const enum TrainingTitleLength {
  Min = 1,
  Max = 15,
}

export const enum TrainingDescriptionLength {
  Min = 10,
  Max = 140,
}

export const enum TrainingCaloriesLoss {
  Min = 1000,
  Max = 5000,
}

export const TrainingApiError = {
  NameNotValid: `Training name must be min ${TrainingTitleLength.Min}, max ${TrainingTitleLength.Max} chars length`,
  ExperienceIsWrong: `Experience field must contain any of these values: ${Object.values(UserExperience).join(', ')}`,
  DurationIsWrong: `Training Time field must contain any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  TypeIsWrong: `Training type field must contain any of these values: ${Object.values(TrainingType).join(', ')}`,
  DescriptionNotValid: `Training description must be min ${TrainingTitleLength.Min}, max ${TrainingTitleLength.Max} chars length`,
  GenderIsWrong: `Training gender must contains any of these values: ${Object.values(UserGender).join(', ')}`,
} as const;

export const TrainingApiDescription = {
  Id: 'The uniq training id',
  Title: `Training name, min ${TrainingTitleLength.Min}, max ${TrainingTitleLength.Max} chars`,
  Image: `Training background image uri, file type *.png/jpg/jpeg and max size ${TRAINING_IMAGE_FILE_MAX_SIZE} bytes allowed to upload`,
  Experience: `Level of user fitness experience any of these values: ${Object.values(UserExperience).join(', ')}`,
  Type: `Training type any of these values: ${Object.values(TrainingType).join(', ')}`,
  Duration: `Type of training duration any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  Price: `Training price , positive integer `,
  CaloriesLoss: `Expected daily calories loss value, min ${TrainingCaloriesLoss.Min}, max ${TrainingCaloriesLoss.Max}`,
  Description: `Training description, min ${TrainingDescriptionLength.Min}, max ${TrainingDescriptionLength.Max} chars`,
  Gender: `Most suitable gender for training any of these values: ${Object.values(UserGender).join(', ')}`,
  Video: `Training video uri, file type *.mov/avi/mp4 and max size ${TRAINING_VIDEO_FILE_MAX_SIZE} bytes allowed toH upload`,
  AuthorId: 'The uniq training author id',
  IsSpecialOffer: 'Training is part of special offer',
  CaloriesMin: 'Minimum calories query threshold',
  CaloriesMax: 'Maximum calories query threshold',
  Rating: 'Training rating',
} as const;
