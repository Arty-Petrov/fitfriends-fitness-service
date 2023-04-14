import { faker } from '@faker-js/faker';
import {
  UserAwardsLength,
  UserCaloriesConsumption,
  UserCaloriesLoss,
  UserMaxTrainingTypeCount,
  UserSignUpDto,
} from '@fitfriends/contracts';
import {
  SubwayStation,
  TrainingDuration,
  TrainingType,
  UserExperience,
  UserGender,
  UserRole,
} from '@fitfriends/shared-types';
import { UserMock } from './mock.constatns';

export const generateUser = (role: UserRole): UserSignUpDto => {
  faker.locale = 'ru';
  const userData = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: UserMock.Avatar,
    gender: faker.helpers.objectValue(UserGender),
    dateBirth: faker.date.birthdate(),
    role: role,
    password: UserMock.Password,
    location: faker.helpers.objectValue(SubwayStation),
    experience: faker.helpers.objectValue(UserExperience),
  };
  const roleData =
    role === UserRole.Customer
      ? {
        trainingTypes: faker.helpers.arrayElements(
          Object.values(TrainingType),
          faker.datatype.number({
            min: 1,
            max: UserMaxTrainingTypeCount.Customer,
          })
        ),
        trainingDuration: faker.helpers.objectValue(TrainingDuration),
        caloriesLoss: faker.datatype.number({
          min: UserCaloriesLoss.Min,
          max: UserCaloriesLoss.Max,
        }),
        caloriesConsumption: faker.datatype.number({
          min: UserCaloriesConsumption.Min,
          max: UserCaloriesConsumption.Max,
        }),
        isReadyForInvite: faker.datatype.boolean(),
      }
      : {
        trainingTypes: faker.helpers.arrayElements(
          Object.values(TrainingType),
          faker.datatype.number({
            min: 1,
            max: UserMaxTrainingTypeCount.Coach,
          })
        ),
        certificate: UserMock.Sertificate,
        awards: faker.lorem.sentences().slice(0, UserAwardsLength.Max),
        isPersonalCoach: faker.datatype.boolean(),
      };
  return { ...userData, ...roleData };
};
