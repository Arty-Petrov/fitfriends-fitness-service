export const USER_SERVICE_ENV_PATH = 'envs/.env';
export const USERS_COLLECTION_NAME = 'users';
export const USER_FRIENDS_COLLECTION_NAME = 'user-friends';

export const SALT_ROUNDS = 10;

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  RmqServiceNameRequired = 'RabbitMQ service name is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqPortRequired = 'RabbitMQ port is required',
  JwtAccessTokenSecretRequired = 'JWT access token secret is required',
  JwtAccessTokenExpiresInRequired = 'JWT access token expires in is required',
  JwtRefreshTokenSecretRequired = 'JWT refresh token secret is required',
  JwtRefreshTokenExpiresInRequired = 'JWT refresh token expires in is required',
}
