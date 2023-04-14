export const FITNESS_SERVICE_ENV_PATH = 'envs/.env';

export const enum EnvValidationMessage {
  RmqServiceNameRequired = 'RabbitMQ service name is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqQueueRequired = 'RabbitMQ Services Queue is required',
}
