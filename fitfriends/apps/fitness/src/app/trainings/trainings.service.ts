import {
  PublicationCreate,
  StorageDeleteFile,
  TrainingCreateDto,
  TrainingUpdateDataDto,
  TrainingUpdateImageDto,
  TrainingUpdateVideoDto,
} from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import {
  AuthorizeOwner,
  OrderStatus,
  ProductType,
  PublicationCategory,
  Training,
  TrainingQuery,
  UserRole,
} from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrdersRepository } from '../orders/orders.repository';
import { TrainingEntity } from './training.entity';
import { TrainingsRepository } from './trainings.repository';

type WithOrderData<T> = T & {
  orderId?: number,
  status?: OrderStatus
}

@Injectable()
export class TrainingsService implements AuthorizeOwner {
  constructor(
    private readonly trainingsRepository: TrainingsRepository,
    private readonly ordersRepository: OrdersRepository,
    private readonly amqpConnection: AmqpConnection
  ) { }

  public async create(
    dto: TrainingCreateDto
  ): Promise<Training> {
    const trainingEntity = new TrainingEntity(dto);
    const training = await this.trainingsRepository.create(trainingEntity);
    const { id, authorId, title, description } = training;
    await this.amqpConnection.publish(
      Exchanges.publication.name,
      PublicationCreate.topic,
      {
        authorId: authorId,
        category: PublicationCategory.Training,
        entityId: id,
        title: title,
        description: description,
      },
    );
    return training;
  }

  public async createMany(
    dtos: TrainingCreateDto[]
  ): Promise<Training[]> {
    const trainings = dtos.map((dto) => new TrainingEntity(dto));
    return this.trainingsRepository.createMany(trainings);
  }

  public async getById(
    id: number
  ): Promise<Training> {
    const existTraining = await this.trainingsRepository.findById(id);
    if (!existTraining) {
      throw new ItemNotFoundException('Training', id);
    }
    return existTraining;
  }

  public async getOne(
    id: number,
    userId: string,
    userRole: UserRole
  ): Promise<WithOrderData<Training>> {
    const existTraining = await this.trainingsRepository.findById(id);
    if (!existTraining) {
      throw new ItemNotFoundException('Training', id);
    }
    if (userRole === UserRole.Customer) {
      await this.ordersRepository.markExpiredOrders(userId);
      const trainingStatus = await this.ordersRepository
        .getOrderStatus(id, ProductType.Training, userId);
      return { ...existTraining, orderId: trainingStatus.id, status: trainingStatus.status };
    }
    if (userId !== existTraining.authorId) {
      throw new ForbiddenException();
    }
    return existTraining;
  }

  public async getList(
    dto: TrainingQuery
  ): Promise<Training[]> {
    return this.trainingsRepository.find(dto);
  }

  public async update(
    dto: TrainingUpdateDataDto
  ): Promise<Training> {
    const { id } = dto;
    const existTraining = await this.getById(id);
    const trainingEntity = new TrainingEntity({ ...existTraining, ...dto });
    return this.trainingsRepository.update(id, trainingEntity);
  }

  public async updateFiles(
    dto: TrainingUpdateImageDto | TrainingUpdateVideoDto
  ): Promise<Training> {
    const { id } = dto;
    const fieldName = Object.values(UploadField)
      .find((field) => dto[field]);
    const existTraining = await this.getById(id);
    const filePath = existTraining[fieldName];
    await this.amqpConnection.request<StorageDeleteFile.Response>({
      exchange: Exchanges.storage.name,
      routingKey: StorageDeleteFile.topic,
      payload: { fileName: filePath },
    });
    return this.update({ ...existTraining, [fieldName]: dto[fieldName] });
  }

  public async isOwner(
    currentUserId: string,
    objectId: string | number
  ): Promise<boolean> {
    const { authorId } = await this.getById(objectId as number);
    return currentUserId === authorId;
  }
}
