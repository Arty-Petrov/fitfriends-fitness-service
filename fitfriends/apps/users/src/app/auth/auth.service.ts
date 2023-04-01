import {
    UserRefreshTokenDto,
    UserSignedRdo,
    UserSignInDto,
    UserSignOutDto,
    UserSignUpDto
} from '@fitfriends/contracts';
import { TokenNotExistsException, UserExistsException, UserNotRegisteredException, UserPasswordWrongException } from '@fitfriends/exceptions';
import { RefreshTokenPayload, User } from '@fitfriends/shared-types';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  public async verifyUser(dto: UserSignInDto): Promise<User> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const userEntity = new UserEntity(existUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new UserPasswordWrongException();
    }

    return userEntity.toObject();
  }

  public async signUp(dto: UserSignUpDto): Promise<User | null> {
    const { email, password } = dto;
    delete dto.password;

    const existUser = await this.userRepository.findByEmail(dto.email);
    if (existUser) {
      throw new UserExistsException(email); 
    }

    const userEntity = await new UserEntity(dto).setPassword(password);
    return this.userRepository.create(userEntity);
  }

  public async createRefreshTokens(dto: UserRefreshTokenDto): Promise<UserSignedRdo> {
    const accessTokenPayload = {
      sub: dto.sub,
      email: dto.email,
      role: dto.role,
      name: dto.name,
    }

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

  public async signIn(dto: UserSignInDto): Promise<UserSignedRdo> {
    const user = await this.verifyUser(dto);
    const refreshPayload: UserRefreshTokenDto = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    return this.createRefreshTokens(refreshPayload);
  }

  public async signOut(dto: UserSignOutDto): Promise<HttpStatus> {
    await this.refreshTokenService.deleteRefreshSession(dto.refreshTokenId);
    return HttpStatus.ACCEPTED;
  }

  public async  refreshToken(dto: UserRefreshTokenDto): Promise<UserSignedRdo> {
    const { refreshTokenId } = dto;
    const existTokenSession = await this.refreshTokenService.isExists(refreshTokenId);
    if (!existTokenSession) {
      throw new TokenNotExistsException(refreshTokenId); 
    }
    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);
    return this.createRefreshTokens(dto);
  }
}
