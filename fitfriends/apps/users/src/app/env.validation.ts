import { MongoPortRange } from '@fitfriends/core';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(MongoPortRange.Min)
  @Max(MongoPortRange.Max)
  public MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public MONGO_AUTH_BASE: string;

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
  public RMQ_HOSTNAME: string;

  @IsString({
    message: EnvValidationMessage.RmqQueueRequired,
  })
  public RMQ_QUEUE: string;
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
