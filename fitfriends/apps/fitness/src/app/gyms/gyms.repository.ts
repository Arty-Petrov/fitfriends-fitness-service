import { Gym, GymListQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GymEntity } from './gym.entity';

@Injectable()
export class GymsRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: GymEntity): Promise<Gym> {
    return this.prisma.gyms.create({
      data: { ...entity },
    }) as unknown as Gym;
  }

  public async createMany(entities: GymEntity[]): Promise<Gym[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.gyms.create({ data: entity }))
    ) as unknown as Gym[];
  }

  public async findById(id: number): Promise<Gym | null> {
    return this.prisma.gyms.findFirst({
      where: { id },
    }) as unknown as Gym;
  }

  public async find(query: GymListQuery): Promise<Gym[]> {
    const { page, count, sortCreation, priceMin, priceMax, locations, features, isVerified } = query;
    console.log(features)
    return this.prisma.gyms.findMany({
      where: {
        price: {
          lte: priceMax,
          gte: priceMin,
        },
        location: { in: locations },
        isVerified: (isVerified) ? true : undefined,
        features: (features) ? { hasEvery: features } : undefined,
      },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Gym[];
  }
}
