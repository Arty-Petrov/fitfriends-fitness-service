export const NOTIFY_SERVICE_ENV_PATH = 'envs/.env';
export const NOTICE_COLLECTION_NAME = 'notice';
export const SUBSCRIBER_COLLECTION_NAME = 'subscriber';
export const PUBLICATION_COLLECTION_NAME = 'publication';

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
  MailServerHostRequired =  'SMTP Server is required',
  MailServerUserNameRequired = 'SMTP Server user name is required',
  MailServerPasswordRequired = 'SMTP Server password is required',
  MailServerDefaultFromRequired = 'Default value for mail from field is required',
  MailServerPortRequired = 'SMTP Server port is required',
}
