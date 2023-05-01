import { faker } from '@faker-js/faker';
import {
  GymCreateDto,
  GymCreateMany,
  OrderCreateMany,
  ReviewCreateMany,
  TrainingCreateDto,
  TrainingCreateMany,
  UserCreateMany,
  UserFriendsDto,
  UserSeedFriends,
  UserSignUpDto,
} from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { Gym, Order, Review, Training, User, UserFriends, UserRole } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { generateFriendList, generateOrder, generateReview, generateTraining, generateUser } from '../mock-generators';
import { generateGym } from '../mock-generators/generate-gym';
import {
  CoacherTrainingsCount,
  COACHES_COUNT,
  CustomerOrdersCount,
  CUSTOMERS_COUNT,
  DefaultEmail,
  GYMS_COUNT,
  TrainingReviewersCount,
  UserFriendsCount,
} from './seed.constant';

@Injectable()
@Command({ name: 'seed' })
export class SeedCommand extends CommandRunner {
  private customers: User[];
  private coaches: User[];
  private friends: UserFriends[];
  private trainings: Training[];
  private reviews: Review[];
  private orders: Order[];
  private gyms: Gym[];

  constructor(private readonly amqpConnection: AmqpConnection) {
    super();
  }
  async run() {
    await this.seedUsers();
    await this.seedFriends();
    await this.seedGyms();
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
    customers = [
      ...customers,
      { ...defaultCustomer, email: DefaultEmail.Customer },
    ];
    this.customers =
      (await this.amqpConnection.request<UserCreateMany.Response>({
        exchange: Exchanges.user.name,
        routingKey: UserCreateMany.topic,
        payload: customers,
      })) as unknown as User[];
    let coaches: Array<UserSignUpDto>;
    await Promise.all(
      (coaches = Array.from({ length: COACHES_COUNT }, () =>
        generateUser(UserRole.Coach)
      ))
    );
    const defaultCoach = coaches.shift();
    coaches = [...coaches, { ...defaultCoach, email: DefaultEmail.Coach }];
    this.coaches = (await this.amqpConnection.request<UserCreateMany.Response>({
      exchange: Exchanges.user.name,
      routingKey: UserCreateMany.topic,
      payload: coaches,
    })) as unknown as User[];
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
    this.friends = (await this.amqpConnection.request<UserSeedFriends.Response>(
      {
        exchange: Exchanges.user.name,
        routingKey: UserSeedFriends.topic,
        payload: friends,
      }
    )) as unknown as UserFriends[];
    console.log('user friends are created');
  }

  private async seedGyms() {
    console.log('creating gyms');
    let gyms: Array<GymCreateDto>;
    await Promise.all(
      (gyms = Array.from({ length: GYMS_COUNT }, () => generateGym()))
    );
    console.log('seed')
    this.gyms = (await this.amqpConnection.request<GymCreateMany.Response>({
      exchange: Exchanges.gyms.name,
      routingKey: GymCreateMany.topic,
      payload: gyms,
    })) as unknown as Gym[];
    console.log('gyms are created');
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
    this.trainings =
      (await this.amqpConnection.request<TrainingCreateMany.Response>({
        exchange: Exchanges.trainings.name,
        routingKey: TrainingCreateMany.topic,
        payload: trainings,
      })) as unknown as Training[];
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
    this.reviews =
      (await this.amqpConnection.request<ReviewCreateMany.Response>({
        exchange: Exchanges.reviews.name,
        routingKey: ReviewCreateMany.topic,
        payload: reviews,
      })) as unknown as Review[];
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
    this.orders = (await this.amqpConnection.request<OrderCreateMany.Response>({
      exchange: Exchanges.reviews.name,
      routingKey: OrderCreateMany.topic,
      payload: orders,
    })) as unknown as Order[];
    console.log('orders are created');
  }
}
