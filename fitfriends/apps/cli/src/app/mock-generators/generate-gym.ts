import { faker } from '@faker-js/faker';
import { GymCreateDto, GymDescriptionLength, GymPriceRange, GymTitleLength } from '@fitfriends/contracts';
import { GymFeature, SubwayStation } from '@fitfriends/shared-types';

export const generateGym = (): GymCreateDto => ({
  title: faker.commerce.productName().slice(0, GymTitleLength.Max),
  location: faker.helpers.objectValue(SubwayStation),
  isVerified: faker.datatype.boolean(),
  features: faker.helpers.arrayElements(
    Object.values(GymFeature),
    faker.datatype.number({
      min: 1,
      max: Object.values(GymFeature).length,
    })
  ),
  photos: [
    'photo1',
    'photo2',
    'photo3',
    'photo4',
  ],
  description: faker.commerce
      .productDescription()
      .slice(0, GymDescriptionLength.Max),
  price: faker.datatype.number({
    min: GymPriceRange.Min,
    max: GymPriceRange.Max,
  }),
});
