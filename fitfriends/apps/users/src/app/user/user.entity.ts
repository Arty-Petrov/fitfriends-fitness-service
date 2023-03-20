import { Entity, SubwayStation, User, UserGender, UserRole } from '@fitfriends/shared-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../app.constant';

export class UserEntity implements Entity<UserEntity>, User {
  public id?: string;
  public name: string;
  public email: string;
  public avatar?: string;
  public passwordHash?: string;
  public gender: UserGender;
  public dateBirth?: Date;
  public role: UserRole;
  public subwayStation: SubwayStation;
  public createdAt?: Date;

  constructor(entity: User) {
    this.fillEntity(entity);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
  toObject(): UserEntity {
    return { ...this };
  }

  fillEntity(entity: User): void {
    this.name = entity.name;
    this.email = entity.email;
    this.avatar = entity.avatar;
    this.passwordHash = entity.passwordHash;
    this.gender = entity.gender;
    this.dateBirth = entity.dateBirth;
    this.role = entity.role;
    this.subwayStation = entity.subwayStation;
    this.createdAt = entity.createdAt;
  }
}
