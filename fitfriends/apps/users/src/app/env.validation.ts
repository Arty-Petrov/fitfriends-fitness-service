import { MongoPortRange } from '@fitfriends/core';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired,
  })
  public USERS_MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired,
  })
  public USERS_MONGO_HOST: string;

  @IsNumber(
    {},
    {
      message: EnvValidationMessage.DBPortRequired,
    }
  )
  @Min(MongoPortRange.Min)
  @Max(MongoPortRange.Max)
  public USERS_MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired,
  })
  public USERS_MONGO_USER: string

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired,
  })
  public USERS_MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired,
  })
  public USERS_MONGO_AUTH_BASE: string;

  @IsString({
    message: EnvValidationMessage.RmqServiceNameRequired,
  })
  public RMQ_SERVICE_NAME: string;

  @IsString({
    message: EnvValidationMessage.RmqExchangeRequired,
  })
  public RMQ_EXCHANGE: string;

  @IsString({
    message: EnvValidationMessage.RmqUserRequired,
  })
  public RMQ_USER: string;

  @IsString({
    message: EnvValidationMessage.RmqPasswordRequired,
  })
  public RMQ_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RmqHostRequired,
  })
  public RMQ_HOST: string;

  @IsString({
    message: EnvValidationMessage.RmqPortRequired,
  })
  public RMQ_PORT: string;

  @IsString({
    message: EnvValidationMessage.JwtAccessTokenSecretRequired,
  })
  public JWT_AT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.JwtAccessTokenExpiresInRequired,
  })
  public JWT_AT_EXPIRES_IN: string;

  @IsString({
    message: EnvValidationMessage.JwtRefreshTokenSecretRequired,
  })
  public JWT_RT_SECRET: string;

  @IsString({
    message: EnvValidationMessage.JwtRefreshTokenExpiresInRequired,
  })
  public JWT_RT_EXPIRES_IN: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(EnvironmentsConfig, config, { enableImplicitConversion: true });

  const errors = validateSync(environmentsConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
