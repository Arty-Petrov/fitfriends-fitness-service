import { StorageDeleteFile, UserListQuery, UserUpdateDataDto } from '@fitfriends/contracts';
import { UploadField } from '@fitfriends/core';
import { UserNotFoundException, UserNotRegisteredException } from '@fitfriends/exceptions';
import { User } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { UserEntity } from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly rmqService: RMQService
  ) { }

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
    const fieldName = Object.values(UploadField).filter((field) => dto[field]).toString();
    const existUser = await this.getById(id);
    const filePath = existUser[fieldName];
    await this.rmqService.notify<StorageDeleteFile.Request>
    (StorageDeleteFile.topic, { fileName: filePath});
    return this.update({ id, [fieldName]: dto[fieldName] });
  }

  public async destroy(id: string): Promise<void> {
    return this.userRepository.destroy(id);
  }
}
