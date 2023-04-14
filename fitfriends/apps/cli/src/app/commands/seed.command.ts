import { faker } from '@faker-js/faker';
import {
  OrderCreateMany,
  ReviewCreateMany,
  TrainingCreateDto,
  TrainingCreateMany,
  UserCreateMany,
  UserFriendsDto,
  UserSeedFriends,
  UserSignUpDto,
} from '@fitfriends/contracts';
import { Order, Review, Training, User, UserFriends, UserRole } from '@fitfriends/shared-types';
import { Command, CommandRunner } from 'nest-commander';
import { RMQService } from 'nestjs-rmq';
import { generateFriendList, generateOrder, generateReview, generateTraining, generateUser } from '../mock-generators';
import {
  CoacherTrainingsCount,
  COACHES_COUNT,
  CustomerOrdersCount,
  CUSTOMERS_COUNT,
  DefaultEmail,
  TrainingReviewersCount,
  UserFriendsCount,
} from './seed.constant';

@Command({ name: 'seed' })
export class SeedCommand extends CommandRunner {
  private customers: User[];
  private coaches: User[];
  private friends: UserFriends[];
  private trainings: Training[];
  private reviews: Review[];
  private orders: Order[];

  constructor(private readonly rmqService: RMQService) {
    super();
  }
  async run() {
    await this.seedUsers();
    await this.seedFriends();
    await this.seedTrainigs();
    await this.seedReviews();
    await this.seedOrders();
  }
  private async seedUsers() {
    console.log('creating users');
    let customers: Array<UserSignUpDto>;
    await Promise.all(
      (customers = Array.from({ length: CUSTOMERS_COUNT }, () =>
        generateUser(UserRole.Customer)
      ))
    );
    const defaultCustomer = customers.shift();
    customers = [...customers, {...defaultCustomer, email: DefaultEmail.Customer}]
    this.customers = (await this.rmqService.send<
      UserCreateMany.Request,
      UserCreateMany.Response
    >(UserCreateMany.topic, customers)) as unknown as User[];
    let coaches: Array<UserSignUpDto>;
    await Promise.all(
      (coaches = Array.from({ length: COACHES_COUNT }, () =>
        generateUser(UserRole.Coach)
      ))
    );
    const defaultCoach = coaches.shift();
    coaches = [...coaches, {...defaultCoach, email: DefaultEmail.Coach}]
    this.coaches = (await this.rmqService.send<
      UserCreateMany.Request,
      UserCreateMany.Response
    >(UserCreateMany.topic, coaches)) as unknown as User[];
    console.log('users are created');
  }

  private async seedFriends() {
    console.log('creating user friends');
    let friends: Array<UserFriendsDto>;
    const userIds = [...this.coaches, ...this.customers].map(
      (coach) => coach?.id
    );
    await Promise.all(
      (friends = userIds.map((userId) => {
        const friendIds = faker.helpers.arrayElements(
          userIds,
          faker.datatype.number({
            min: UserFriendsCount.Min,
            max: UserFriendsCount.Max,
          })
        );
        return generateFriendList(userId, friendIds);
      }))
    );

    this.friends = (await this.rmqService.send<
      UserSeedFriends.Request,
      UserSeedFriends.Response
    >(UserSeedFriends.topic, friends)) as unknown as UserFriends[];

    console.log('user friends are created');
  }

  private async seedTrainigs() {
    let trainings: Array<TrainingCreateDto>;
    console.log('creating trainings');
    const coachIds = this.coaches.map((coach) => coach?.id);
    await Promise.all(
      (trainings = coachIds
        .map((coachId) => {
          return Array.from(
            {
              length: faker.datatype.number({
                min: CoacherTrainingsCount.Min,
                max: CoacherTrainingsCount.Max,
              }),
            },
            () => generateTraining(coachId)
          );
        })
        .flat())
    );
    this.trainings = (await this.rmqService.send<
      TrainingCreateMany.Request,
      TrainingCreateMany.Response
    >(TrainingCreateMany.topic, trainings)) as unknown as Training[];
    console.log('trainings are created');
  }

  private async seedReviews() {
    let reviews: Array<Review>;
    console.log('creating reviews');
    const customerIds = this.customers.map((customer) => customer?.id);
    const trainingIds: number[] = this.trainings.map(
      (training) => training?.id
    );
    await Promise.all(
      (reviews = trainingIds
        .map((trainingId) =>
          faker.helpers
            .arrayElements(
              customerIds,
              faker.datatype.number({
                min: TrainingReviewersCount.Min,
                max: TrainingReviewersCount.Max,
              })
            )
            .map((reviewer) => generateReview(trainingId, reviewer))
        )
        .flat())
    );
    this.reviews = (await this.rmqService.send<
      ReviewCreateMany.Request,
      ReviewCreateMany.Response
    >(ReviewCreateMany.topic, reviews)) as unknown as Review[];
    console.log('reviews are created');
  }

  private async seedOrders() {
    let orders: Array<Order>;
    console.log('creating orders');
    const customerIds = this.customers.map((customer) => customer?.id);
    const products = this.trainings;
    await Promise.all(
      (orders = customerIds
        .map((customerId) =>
          faker.helpers
            .arrayElements(
              products,
              faker.datatype.number({
                min: CustomerOrdersCount.Min,
                max: CustomerOrdersCount.Max,
              })
            )
            .map((product) => generateOrder(customerId, product))
        )
        .flat())
    );
    this.orders = (await this.rmqService.send<
      OrderCreateMany.Request,
      OrderCreateMany.Response
    >(OrderCreateMany.topic, orders)) as unknown as Order[];
    console.log('orders are created');
  }
}
