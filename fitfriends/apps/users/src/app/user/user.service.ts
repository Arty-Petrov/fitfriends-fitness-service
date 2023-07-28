import { StorageDeleteFile, UserListQuery, UserSignUpDto, UserUpdateDataDto } from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { UserNotFoundException, UserNotRegisteredException } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { User } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly amqpConnection: AmqpConnection
  ) { }

  public async createMany(dtos: UserSignUpDto[]): Promise<User[]> {
    const users: UserEntity[] = [];
    for (const dto of dtos) {
      const { email, password } = dto;
      delete dto.password;
      const existUser = await this.userRepository.findByEmail(email);
      if (existUser) {
        break;
      }
      const userEntity = await new UserEntity(dto).setPassword(password);
      users.push(userEntity);
    }
    return this.userRepository.createMany(users);
  }

  public async getById(id: string): Promise<User | null> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundException(id);
    }
    return existUser;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }
    return existUser;
  }

  public async getUsersList(query: UserListQuery): Promise<User[]> {
    return this.userRepository.find(query);
  }

  public async update(dto: UserUpdateDataDto): Promise<User | null> {
    const { id } = dto;
    delete dto.id;
    const existUser = await this.getById(id);
    const newUserEntity = new UserEntity({ ...existUser, ...dto });
    return this.userRepository.update(id, newUserEntity);
  }

  public async updateFiles(dto: UserUpdateDataDto) {
    const id = dto?.id;
    const fieldName = Object.values(UploadField)
      .filter((field) => dto[field])
      .toString();
    const existUser = await this.getById(id);
    const filePath = existUser[fieldName];
    await this.amqpConnection.request<StorageDeleteFile.Response>({
      exchange: Exchanges.storage.name,
      routingKey: StorageDeleteFile.topic,
      payload: { fileName: filePath },
    });
    return this.update({ id, [fieldName]: dto[fieldName] });
  }

  public async destroy(id: string): Promise<void> {
    return this.userRepository.destroy(id);
  }
}
