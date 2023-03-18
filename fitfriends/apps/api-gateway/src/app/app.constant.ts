export const API_GATEWAY_APP_ENV_PATH = 'envs/.api-gateway.env';

export const AVATAR_FILE_TYPE_REGEXP = /\/(jpg|jpeg|png)$/;
export const AVATAR_FILE_MAX_SIZE = 1024000;

export const CERTIFICATE_FILE_TYPE_REGEXP = /\/(pdf)$/;
export const CERTIFICATE_FILE_MAX_SIZE = 1024000;

export const GYM_PHOTO_FILE_TYPE_REGEXP = /\/(jpg|jpeg|png)$/;
export const GYM_PHOTO_FILE_MAX_SIZE = 5120000;
export const GYM_PHOTO_FILE_MAX_COUNT = 5;

export const TRAINING_MOVIE_FILE_TYPE_REGEXP = /\/(mov|avi|mp4)$/;
export const TRAINING_MOVIE_FILE_MAX_SIZE = 10240000;

export enum EnvValidationMessage {
  RmqExchangeRequired = 'RabbitMQ host is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
}
