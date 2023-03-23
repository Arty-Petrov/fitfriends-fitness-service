import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import * as process from 'process';

export const jwtOptions = registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_AT_SECRET,
  accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_RT_SECRET,
  refreshTokenExpiresIn: process.env.JWT_RT_EXPIRES_IN,
}));

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    },
  })
});
