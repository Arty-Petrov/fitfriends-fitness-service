import { SortOrder, TrainingDuration, TrainingType, UserExperience, UserGender } from '@fitfriends/shared-types';

export const TRAINING_IMAGE_FILE_MAX_SIZE = 1024000;
export const TRAINING_IMAGE_FILE_TYPE_REGEXP = /\/(jpg|jpeg|png)$/;

export const TRAINING_VIDEO_FILE_TYPE_REGEXP = /\/(mov|avi|mp4)$/;
export const TRAINING_VIDEO_FILE_MAX_SIZE = 10240000;

export const DEFAULT_TRAININGS_PAGINATION_COUNT = 1;
export const DEFAULT_TRAININGS_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_TRAININGS_COUNT_LIMIT = 50;

export const enum TrainingNameLength {
  Min = 1,
  Max = 15,
}

export const enum TrainingDescriptionLength {
  Min = 10,
  Max = 140,
}

export const enum TrainingPriceRange {
  Min = 100,
  Max = 5000,
  Default = 0,
}

export const enum TrainingCaloriesLoss {
  Min = 1000,
  Max = 5000,
}

export const TrainingApiError = {
  NameNotValid: `Training name must be min ${TrainingNameLength.Min}, max ${TrainingNameLength.Max} chars length`,
  ExperienceIsWrong: `Expirience field must contain any of these values: ${Object.values(UserExperience).join(', ')}`,
  DurationIsWrong: `Training Time field must contain any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  TypeIsWrong: `Training type field must contain any of these values: ${Object.values(TrainingType).join(', ')}`,
  PriceNotValid: `Training price value must be, min ${TrainingPriceRange.Min}, max ${TrainingPriceRange.Max} or ${TrainingPriceRange.Default}`,
  DescriptionNotValid: `Training description must be min ${TrainingNameLength.Min}, max ${TrainingNameLength.Max} chars length`,
  GenderIsWrong: `Trainig genger must contains any of these values: ${Object.values(UserGender).join(', ')}`,
} as const;

export const TrainingApiDescription = {
  Id: 'The uniq training id',
  Name: `Training name, min ${TrainingNameLength.Min}, max ${TrainingNameLength.Max} chars`,
  Image: `Training backgrounf image uri, file type *.png/jpg/jpeg and max size ${TRAINING_IMAGE_FILE_MAX_SIZE} bytes allowed to upload`,
  Experience: `Level of user fitnes expirience any of these values: ${Object.values(UserExperience).join(', ')}`,
  Type: `Training type any of these values: ${Object.values(TrainingType).join(', ')}`,
  Duration: `Type of training duration any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  Price: `Training price, min ${TrainingPriceRange.Min}, max ${TrainingPriceRange.Max} value or ${TrainingPriceRange.Default}`,
  CaloriesLoss: `Expected daily calories loss value, min ${TrainingCaloriesLoss.Min}, max ${TrainingCaloriesLoss.Max}`,
  Description: `Training description, min ${TrainingDescriptionLength.Min}, max ${TrainingDescriptionLength.Max} chars`,
  Gender: `Most suitable gender for training any of these values: ${Object.values(UserGender).join(', ')}`,
  Video: `Training video uri, file type *.mov/avi/mp4 and max size ${TRAINING_VIDEO_FILE_MAX_SIZE} bytes allowed toH upload`,
  TrainerId: 'The uniq training author id',
  IsSpecialOffer: 'Trining is part of special offer',
  PriceMin: 'Minimum price query treshold',
  PriceMax: 'Maximum price query treshold',
  CaloriesMin: 'Minimum calories query treshold',
  CaloriesMax: 'Maximum calories query treshold',
  Rating: 'Training raiting',
} as const;
