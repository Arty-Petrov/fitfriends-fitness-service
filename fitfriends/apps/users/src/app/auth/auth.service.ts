import { UserApiError, UserLoggedRdo, UserLoginDto, UserLogoutDto, UserRegisterDto, UserUpdatePasswordDto } from '@fitfriends/contracts';
import { User, UserRole } from '@fitfriends/shared-types';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import UserRepository from '../user/user.repository';
import AuthRepository from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository, private readonly userRepository: UserRepository) { }

  private async verifyUser(dto: UserLoginDto): Promise<User | null> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    const userEntity = new UserEntity(existUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new HttpException(UserApiError.PasswordIsWrong, HttpStatus.FORBIDDEN);
    }
    return userEntity.toObject();
  }

  public async register(dto: UserRegisterDto): Promise<User | null> {
    const { email, password } = dto;
    delete dto.password;

    const existUser = await this.userRepository.findByEmail(dto.email);
    if (existUser) {
      throw new HttpException(`User with email: ${email} already exist`, HttpStatus.CONFLICT);
    }

    const userEntity = await new UserEntity(dto).setPassword(password);

    return this.userRepository.create(userEntity);
  }
  public async login(dto: UserLoginDto): Promise<UserLoggedRdo> {
    console.log({ ...dto });
    return {
      name: '',
      email: 'e@e',
      avatar: 'img',
      role: UserRole.Customer,
      accessToken: 'token',
    };
  }

  public async logout(dto: UserLogoutDto): Promise<HttpStatus> {
    console.log({ ...dto });
    return HttpStatus.NOT_IMPLEMENTED;
  }

  public async updatePassword(dto: UserUpdatePasswordDto) {
    const { email, currentPassword, updatePassword } = dto;

    const verifiedUser = await this.verifyUser({
      email: email,
      password: currentPassword,
    });

    const userEntity = await new UserEntity(verifiedUser).setPassword(updatePassword);

    return this.userRepository.update(verifiedUser.id, userEntity);
  }
}
