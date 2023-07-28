import { MongoPortRange } from '@fitfriends/core';
import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { EnvValidationMessage } from './app.constant';

class EnvironmentsConfig {
  @IsString({
    message: EnvValidationMessage.DBNameRequired
  })
  public NOTIFY_MONGO_DB: string;

  @IsString({
    message: EnvValidationMessage.DBHostRequired
  })
  public NOTIFY_MONGO_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.DBPortRequired
  })
  @Min(MongoPortRange.Min)
  @Max(MongoPortRange.Max)
  public NOTIFY_MONGO_PORT: number;

  @IsString({
    message: EnvValidationMessage.DBUserRequired
  })
  public NOTIFY_MONGO_USER: string;

  @IsString({
    message: EnvValidationMessage.DBPasswordRequired
  })
  public NOTIFY_MONGO_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.DBBaseAuthRequired
  })
  public NOTIFY_MONGO_AUTH_BASE: string;

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
    message: EnvValidationMessage.MailServerHostRequired
  })
  public NOTIFY_MAIL_SMTP_HOST: string;

  @IsNumber({}, {
    message: EnvValidationMessage.MailServerPortRequired
  })
  @Min(MongoPortRange.Min)
  @Max(MongoPortRange.Max)
  public NOTIFY_MAIL_SMTP_PORT: number;

  @IsString({
    message: EnvValidationMessage.MailServerUserNameRequired
  })
  public NOTIFY_MAIL_USER_NAME: string;

  @IsString({
    message: EnvValidationMessage.MailServerPasswordRequired
  })
  public NOTIFY_MAIL_USER_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.MailServerDefaultFromRequired
  })
  public NOTIFY_MAIL_FROM: string;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
