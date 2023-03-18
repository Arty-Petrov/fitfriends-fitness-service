export const USER_SERVICE_ENV_PATH = 'envs/.users.env';
export const USERS_COLLECTION_NAME = 'users';

export const SALT_ROUNDS = 10;

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  RmqExchangeRequired = 'RabbitMQ exchange is required',
  RmqHostRequired = 'RabbitMQ host is required',
  RmqUserRequired = 'RabbitMQ user is required',
  RmqPasswordRequired = 'RabbitMQ password is required',
  RmqQueueRequired = 'RabbitMQ Auth Queue is required',
}
