export const API_GATEWAY_APP_ENV_PATH = 'envs/.api-gateway.env';

export enum EnvValidationMessage {
  RmqExchangeRequired = 'RabbitMQ host is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
}
