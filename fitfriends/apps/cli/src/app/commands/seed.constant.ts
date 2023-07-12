export const CUSTOMERS_COUNT = 20;
export const COACHES_COUNT = 10;
export const GYMS_COUNT = 5;

export const UserFriendsCount = {
  Min: (CUSTOMERS_COUNT + COACHES_COUNT) / 4,
  Max: (CUSTOMERS_COUNT + COACHES_COUNT) / 2,
} as const;

export const CoacherTrainingsCount = {
  Min: 1,
  Max: 3,
} as const;

export const TrainingReviewersCount = {
  Min: 3,
  Max: 10,
} as const;

export const CustomerOrdersCount = {
  Min: 3,
  Max: 10,
} as const;

export const DefaultEmail = {
  Customer: 'customer@fitfriends.local',
  Coach: 'coach@fitfriends.local',
} as const;
