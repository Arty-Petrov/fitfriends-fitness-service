import { GymCreateDto } from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Gym, GymQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GymEntity } from './gym.entity';
import { GymsRepository } from './gyms.repository';

@Injectable()
export class GymsService {
  constructor(private readonly gymsRepository: GymsRepository) { }

  public async create(dto: GymCreateDto): Promise<Gym> {
    const gymEntity = new GymEntity(dto);
    return this.gymsRepository.create(gymEntity);
  }

  public async createMany(dtos: GymCreateDto[]): Promise<Gym[]> {
    const gyms = dtos.map((dto) => new GymEntity(dto));
    return this.gymsRepository.createMany(gyms);
  }

  public async getById(id: number): Promise<Gym> {
    const existGym = await this.gymsRepository.findById(id);
    if (!existGym) {
      throw new RpcException(ItemNotFoundException('Gym', id));
    }
    return existGym;
  }

  public async getList(query: GymQuery): Promise<Gym[]> {
    return this.gymsRepository.find(query);
  }
}
