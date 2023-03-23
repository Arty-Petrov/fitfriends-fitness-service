import {
  UserApiError,
  UserLoggedRdo,
  UserLoginDto,
  UserLogoutDto,
  UserRefreshTokenDto,
  UserRegisterDto,
  UserUpdatePasswordDto,
} from '@fitfriends/contracts';
import { RefreshTokenPayload, User } from '@fitfriends/shared-types';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { jwtOptions } from '../../config/jwt.config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserEntity } from '../user/user.entity';
import UserRepository from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) { }

  public async verifyUser(dto: UserLoginDto): Promise<User> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new HttpException(UserApiError.NotFound, HttpStatus.NOT_FOUND);
    }

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

  public async createRefreshTokens(dto: UserRefreshTokenDto): Promise<UserLoggedRdo> {
    const { refreshTokenId } = dto;
    const accessTokenPayload = {
      sub: dto.sub,
      email: dto.email,
      role: dto.role,
      name: dto.name,
    }

    await this.refreshTokenService
      .deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...accessTokenPayload, refreshTokenId: randomUUID()
    }
    await this.refreshTokenService
      .createRefreshSession(refreshTokenPayload);

    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtConfig.refreshTokenSecret,
        expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      })
    };
  }

  public async login(dto: UserLoginDto): Promise<UserLoggedRdo> {
    const user = await this.verifyUser(dto);
    const refreshPayload: UserRefreshTokenDto = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return this.createRefreshTokens(refreshPayload);
  }

  public async logout(dto: UserLogoutDto): Promise<HttpStatus> {
    await this.refreshTokenService.deleteRefreshSession(dto.refreshTokenId);
    return HttpStatus.ACCEPTED;
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
