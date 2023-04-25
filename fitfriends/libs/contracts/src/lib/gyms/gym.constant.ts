import { GymFeature, SortOrder, SubwayStation } from '@fitfriends/shared-types';

export const GYM_PHOTO_FILE_TYPE_REGEXP = /\/(jpg|jpeg|png)$/;
export const GYM_PHOTO_FILE_MAX_SIZE = 5120000;
export const GYM_PHOTO_FILE_MAX_COUNT = 5;

export const DEFAULT_GYM_PAGINATION_COUNT = 1;
export const DEFAULT_GYM_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_GYM_COUNT_LIMIT = 50;

export const enum GymTitleLength {
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
  TitleNotValid: `Gym name must be min ${GymTitleLength.Min}, max ${GymTitleLength.Max} chars length`,
  LocationIsWrong: `Gym location field must contain any of these values: ${Object.values(SubwayStation).join(', ')}`,
  FeaturesIsWrong: `Gym features field must contain any of these values: ${Object.values(GymFeature).join(', ')}`,
  PhotosSizeIsWrong: `Features array field must be min ${GymPhotosSize.Min}: ${GymPhotosSize.Max}`,
  DescriptionNotValid: `Gym name must be min ${GymDescriptionLength.Min}, max ${GymDescriptionLength.Max} chars length`,
  PriceNotValid: `Gym price value must be, min ${GymPriceRange.Min}, max ${GymPriceRange.Max}`,
} as const;

export const GymApiDescription = {
  Id: 'The uniq gym id',
  Title: `Gym name, min ${GymTitleLength.Min}, max ${GymTitleLength.Max} chars`,
  Location: `Gym location contains from any of these values: ${Object.values(SubwayStation).join(', ')}`,
  IsVeryfied: 'Gym is verifyed',
  Features: `Gym features any of these values: ${Object.values(GymFeature).join(', ')}`,
  Photos: `Photos uri, file type *.png/jpg/jpeg and max size ${GYM_PHOTO_FILE_MAX_SIZE} bytes allowed to upload`,
  Description: `Gym description, min ${GymDescriptionLength.Min}, max ${GymDescriptionLength.Max} chars`,
  Price: `Gym visit price, min ${GymPriceRange.Min}, max ${GymPriceRange.Max}`,
} as const;
