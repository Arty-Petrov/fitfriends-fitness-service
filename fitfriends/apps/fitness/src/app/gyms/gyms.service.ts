import { GymCreateDto, GymFavoriteDto, GymFavoriteListQuery, GymListQuery, GymQuery } from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { DocumentExists, Gym } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GymEntity } from './gym.entity';
import { GymsRepository } from './gyms.repository';

@Injectable()
export class GymsService implements DocumentExists {
  constructor(private readonly gymsRepository: GymsRepository) { }

  public async create(dto: GymCreateDto): Promise<Gym> {
    const gymEntity = new GymEntity(dto);
    return this.gymsRepository.create(gymEntity);
  }

  public async createMany(dtos: GymCreateDto[]): Promise<Gym[]> {
    const gyms = dtos.map((dto) => new GymEntity(dto));
    return this.gymsRepository.createMany(gyms);
  }

  public async getById(query: GymQuery): Promise<Gym> {
    const { itemId, userId } = query;
    const existGym = await this.gymsRepository.findById(itemId, userId);
    if (!existGym) {
      throw new RpcException(new ItemNotFoundException('Gym', itemId));
    }
    return existGym;
  }

  public async getList(query: GymListQuery): Promise<Gym[]> {
    return this.gymsRepository.find(query);
  }

  public async getFavoriteList(query: GymFavoriteListQuery): Promise<Gym[]> {
    return this.gymsRepository.findFavorites(query);
  }

  public async toggleFavorite(dto: GymFavoriteDto): Promise<Gym | null> {
    const { userId, itemId } = dto;
    const existRecord = await this.gymsRepository.findByFanId(userId);
    const isFavorite = (existRecord)
      ? existRecord.find((gym: Gym) => gym.id === itemId)
      : false;
    return (isFavorite)
      ? this.gymsRepository.unsetFavorite(dto)
      : this.gymsRepository.setFavorite(dto);
  }

  public async exists(itemId: number): Promise<boolean> {
    const existGym = await this.gymsRepository.findById(itemId);
    if (!existGym) {
      throw new RpcException(new ItemNotFoundException('Gym', itemId));
    }
    return true;
  }
}
