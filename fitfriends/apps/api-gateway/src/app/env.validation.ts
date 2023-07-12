import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
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
