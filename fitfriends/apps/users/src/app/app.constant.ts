export const USER_SERVICE_ENV_PATH = 'envs/.users.env';

export enum EnvValidationMessage {
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqQueueRequired = 'RabbitMQ Auth Queue is required',
}
