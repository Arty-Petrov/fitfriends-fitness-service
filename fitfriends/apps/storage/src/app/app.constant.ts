export const STORAGE_SERVICE_ENV_PATH = 'envs/.env';

export enum EnvValidationMessage {
  RmqServiceNameRequired = 'RabbitMQ service name is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqQueueRequired = 'RabbitMQ Storage Queue is required',
}
