export const FITNESS_SERVICE_ENV_PATH = 'envs/.env';
export const ORDER_EXPIRATION_PERIOD = { 'minutes': 2 };

export const enum EnvValidationMessage {
  RmqServiceNameRequired = 'RabbitMQ service name is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqPortRequired = 'RabbitMQ port is required',
}
