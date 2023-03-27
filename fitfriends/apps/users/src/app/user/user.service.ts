import { UserApiError, UserListQuery, UserUpdateDataDto, UserUploadAvatarDto } from '@fitfriends/contracts';
import { User } from '@fitfriends/shared-types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  public async getById(id: string): Promise<User | null> {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new HttpException(UserApiError.NotFound, HttpStatus.NOT_FOUND);
    }
    return existUser;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new HttpException(UserApiError.NotFound, HttpStatus.NOT_FOUND);
    }
    return existUser;
  }

  public async getUsersList(query: UserListQuery): Promise<User[]> {
    return this.userRepository.find(query);
  }

  public async update(id: string, dto: UserUpdateDataDto): Promise<User | null> {
    const existUser = await this.getById(id);

    const newUserEntity = new UserEntity({ ...existUser, ...dto });
    return this.userRepository.update(id, newUserEntity);
  }

  public async updateAvatar(id: string, dto: UserUploadAvatarDto) {
    const { avatar } = dto;

    const user = await this.getById(id);

    const userEntity = new UserEntity({ ...user, avatar });
    return this.userRepository.update(user.id, userEntity);
  }

  public async destroy(id: string): Promise<void> {
    return this.userRepository.destroy(id);
  }
}
