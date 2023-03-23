export const API_GATEWAY_APP_ENV_PATH = 'envs/.env';
export const API_GATEWAY_APP_DEFAULT_PORT = 3333;

export enum EnvValidationMessage {
  RmqServiceNameRequired = 'RabbitMQ service name is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  JwtAccessTokenSecretRequired = 'JWT access token secret is required',
  JwtAccessTokenExpiresInRequired = 'JWT access token expires in is required',
  JwtRefreshTokenSecretRequired = 'JWT refresh token secret is required',
  JwtRefreshTokenExpiresInRequired = 'JWT refresh token expires in is required',
}
