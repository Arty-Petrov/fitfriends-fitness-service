import { GymFavoriteDto, GymFavoriteListQuery, GymListQuery } from '@fitfriends/contracts';
import { Gym } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { FavoriteGym } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GymEntity } from './gym.entity';

type WithGymFavorites<T> = T & {
  favoriteGyms: Array<FavoriteGym>
}

@Injectable()
export class GymsRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: GymEntity): Promise<Gym> {
    return this.prisma.gym.create({
      data: { ...entity },
    }) as unknown as Gym;
  }

  public async createMany(entities: GymEntity[]): Promise<Gym[]> {
    return this.prisma.$transaction(
      entities.map((entity) => this.prisma.gym.create({ data: entity }))
    ) as unknown as Gym[];
  }

  public async findUserItem(itemId: number, userId: string = null): Promise<Gym> {
    const gym = await this.prisma.gym.findFirst({
      where: { id: itemId },
      include: {
        favoriteGyms: true,
      },
    }) as unknown as WithGymFavorites<Gym>;
    if (userId) {
      return this.computeFavorite(gym, userId);
    }
    delete gym.favoriteGyms
    return gym;
  }

  public async findById(itemId: number): Promise<boolean> {
    const gym = await this.prisma.gym.findFirst({
      where: { id: itemId },
    }) as unknown as Gym;
    return !!gym;
  }

  public async find(query: GymListQuery): Promise<Gym[]> {
    const { page, count, sortCreation, priceMin, priceMax, locations, features, isVerified, userId } = query;
    const gyms = await this.prisma.gym.findMany({
      where: {
        price: {
          lte: priceMax,
          gte: priceMin,
        },
        location: { in: locations },
        isVerified: (isVerified) ? true : undefined,
        features: (features) ? { hasEvery: features } : undefined,
      },
      include: {
        favoriteGyms: true,
      },
      orderBy: [{ createdAt: sortCreation }],
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as WithGymFavorites<Gym>[];
    return gyms.map((gym) => this.computeFavorite(gym, userId));
  }

  public async findFavorites(query: GymFavoriteListQuery): Promise<Gym[]> {
    const { page, count, userId } = query;
    const gyms = await this.prisma.gym.findMany({
      where: { favoriteGyms: { some: { fanId: userId } } },
      take: count,
      skip: page > 0 ? count * (page - 1) : undefined,
    }) as unknown as Gym[];
    return gyms.map((gym) => this.addFavoriteStatus(gym, true));
  }

  public async findByFanId(userId: string): Promise<Gym[]> {
    return this.prisma.gym.findMany({
      where: { favoriteGyms: { some: { fanId: userId } } },
    }) as unknown as Gym[];
  }

  public async setFavorite(dto: GymFavoriteDto): Promise<Gym> {
    const { userId, itemId } = dto;
    const gym = await this.prisma.gym.update({
      where: { id: itemId },
      data: {
        favoriteGyms: {
          connectOrCreate: {
            where: { fanId: userId },
            create: { fanId: userId },
          }
        }
      }
    }) as unknown as Gym;
    return this.addFavoriteStatus(gym, true);
  }

  public async unsetFavorite(dto: GymFavoriteDto): Promise<Gym> {
    const { userId, itemId } = dto;
    const gym = await this.prisma.gym.update({
      where: { id: itemId },
      data: { favoriteGyms: { disconnect: { fanId: userId } } }
    }) as unknown as Gym;
    return this.addFavoriteStatus(gym);
  }

  private computeFavorite(gym: WithGymFavorites<Gym>, userId: string): Gym {
    const { favoriteGyms } = gym;
    let favoriteStatus = false;
    if (favoriteGyms.length) {
      favoriteStatus = favoriteGyms.some((item) => item.fanId === userId);
    }
    delete gym.favoriteGyms;
    return { ...gym, isFavorite: favoriteStatus }
  }

  private addFavoriteStatus(gym: Gym, favoriteStatus = false): Gym {
    return { ...gym, isFavorite: favoriteStatus }
  }
}
