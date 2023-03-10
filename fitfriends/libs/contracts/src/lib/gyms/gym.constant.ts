import { GymFeature, SortOrder, SubwayStation } from '@fitfriends/shared-types';

export const MAX_GYM_PHOTO_FILE_SIZE = 5120000;

export const DEFAULT_PAGINATION_COUNT = 1;
export const DEFAULT_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_GYM_COUNT_LIMIT = 50;

export const enum GymNameLength {
  Min = 1,
  Max = 15,
}

export const enum GymDescriptionLength {
  Min = 0,
  Max = 140,
}

export const enum GymPriceRange {
  Min = 100,
  Max = 5000,
}

export const enum GymPhotosSize {
  Min = 1,
  Max = 5,
}

export const GymApiError = {
  NameNotValid: `Training name must be min ${GymNameLength.Min}, max ${GymNameLength.Max} chars length`,
  LocationIsWrong: `User location field must contain any of these values: ${Object.values(SubwayStation).join(', ')}`,
  FeaturesIsWrong: `Gym features field must contain any of these values: ${Object.values(GymFeature).join(', ')}`,
  PhotosSizeIsWrong: `Features array field must be min ${GymPhotosSize.Min}: ${GymPhotosSize.Max}`,
  DescriptionNotValid: `Training name must be min ${GymDescriptionLength.Min}, max ${GymDescriptionLength.Max} chars length`,
  PriceNotValid: `Training price value must be, min ${GymPriceRange.Min}, max ${GymPriceRange.Max}`,
} as const;

export const GymApiDescription = {
  Id: 'The uniq gym id',
  Name: `Gym name, min ${GymNameLength.Min}, max ${GymNameLength.Max} chars`,
  Location: `Gym location contains from any of these values: ${Object.values(SubwayStation).join(', ')}`,
  IsVeryfied: 'Gym is verifyed',
  Features: `Gym features any of these values: ${Object.values(GymFeature).join(', ')}`,
  Photos: `Photos uri, file type *.png/jpg/jpeg and max size ${MAX_GYM_PHOTO_FILE_SIZE} bytes allowed to upload`,
  Description: `Training description, min ${GymDescriptionLength.Min}, max ${GymDescriptionLength.Max} chars`,
  Price: `Training price, min ${GymPriceRange.Min}, max ${GymPriceRange.Max}`,
} as const;
