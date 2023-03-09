import { SortOrder, SubwayStation, TrainingDuration, TrainingType, UserExpirience, UserGender, UserRole } from '@fitfriends/shared-types';
export const SALT_ROUNDS = 10;
export const MAX_AVATAR_FILE_SIZE = 1024000;
export const MAX_SERTIFICATE_FILE_SIZE = 1024000;
export const NAME_REGEXP = /[a-zA-Zа-яА-Я]/;

export const DEFAULT_PAGINATION_COUNT = 1;
export const DEFAULT_SORT_ORDER = SortOrder.Descended;
export const DEFAULT_USERS_COUNT_LIMIT = 50;

export const enum UserPasswordLength {
  Min = 6,
  Max = 12,
}

export const enum UserNameLength {
  Min = 1,
  Max = 15,
}

export const enum UserAwardsLength {
  Min = 10,
  Max = 140,
}

export const enum UserMaxTrainingTypeCount {
  Consumer = 1,
  Trainer = 3,
}

export const enum UserCaloriesLoss {
  Min = 1000,
  Max = 5000,
}

export const enum UserCaloriesConsumption {
  Min = 1000,
  Max = 5000,
}

export const UserApiError = {
  LocationIsWrong: `User location field must contain any of these values: ${Object.values(SubwayStation).join(', ')}`,
  DateBirthNotValid: 'The user date birth is not valid',
  NameIsNotValid: 'Name string must contains latin and cyrillic althabet characters only',
  AlreadyExists: 'User with this email already exists',
  AwardsNotValid: `User info should not be more than ${UserAwardsLength.Max} chars length`,
  NameNotValid: `User name, min ${UserNameLength.Min}, max ${UserNameLength.Max} chars length`,
  NotFound: 'User not found',
  GenderIsWrong: `User genger must contains any of these values: ${Object.values(UserGender).join(', ')}`,
  TrainingDurationIsWrong: `Training Time field must contain any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  TrainingTypeIsWrong: `Training type field must contain any of these values: ${Object.values(TrainingType).join(', ')}`,
  ExpirienceIsWrong: `Expirience field must contain any of these values: ${Object.values(UserExpirience).join(', ')}`,
  PasswordNotValid: `Password min length is  ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`,
  PasswordIsWrong: 'User password is wrong',
  RoleIsWrong: `User role field must contains any of these values: ${Object.values(UserRole).join(', ')}`,
  AvatarFileTypeWrong: 'Avatar image must be jpg or png',
  SertificateFileTypeWrong: 'Sertificarte file type must be pdf',
} as const;

export const UserApiDescription = {
  Id: 'The uniq user id',
  Name: `User name and surname, min ${UserNameLength.Min}, max ${UserNameLength.Max} chars`,
  Email: 'User unique email address',
  Avatar: `User avatar uri, file type *.png/jpg/jpeg and max size ${MAX_AVATAR_FILE_SIZE} bytes allowed to upload`,
  Password: `User password, min ${UserPasswordLength.Min}, max ${UserPasswordLength.Max} chars length`,
  CurrentPassword: `User's current password`,
  PasswordUpdate: `New password, min ${UserPasswordLength.Min}, max ${UserPasswordLength.Max} chars length`,
  Gender: `User gender any of these values: ${Object.values(UserGender).join(', ')}`,
  DateBirth: 'User birth date, ISO8601 string',
  Role: `User role any of these values: ${Object.values(UserRole).join(', ')}`,
  Location: `User location contains from any of these values: ${Object.values(SubwayStation).join(', ')}`,
  CreatedAt: 'User entry creation date, ISO8601 string',
  Expirience: `Level of user fitnes expirience any of these values: ${Object.values(UserExpirience).join(', ')}`,
  TraningType: `Training type any of these values: ${Object.values(TrainingType).join(', ')}`,
  TrainingDuration: `Type of training duration any of these values: ${Object.values(TrainingDuration).join(', ')}`,
  CaloriesLoss: `Expected daily calories loss value, min ${UserCaloriesLoss.Min}, max ${UserCaloriesLoss.Max}`,
  CaloriesConsumption: `Expected daily calories consumptuin value, min $UserCaloriesConsumption.Min}, max ${UserCaloriesConsumption.Max}`,
  IsReadyForInvite: 'User is ready to recieve invites to trainig, boolean flag',
  Sertificate: `User trainer sertificate uri, file type *.pdf and max size ${MAX_SERTIFICATE_FILE_SIZE} bytes allowed to upload`,
  Awards: `Optional user trainer info, min ${UserNameLength.Min}, max ${UserAwardsLength.Max} chars length`,
  IsPersonalTrainer: 'Trainer is ready to perform trainings, boolean flag',
  AccessToken: 'Access token',
  RefreshToken: 'Refresh token',
} as const;

export enum ResponseGroup {
  Customer = 'customer',
  Trainer = 'trainer',
}
