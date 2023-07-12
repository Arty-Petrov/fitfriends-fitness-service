import { registerAs } from '@nestjs/config';

export const rabbitMqOptions = registerAs('rmq', () => ({
  serviceName: process.env.RMQ_SERVICE_NAME,
  user: process.env.RMQ_USER,
  password: process.env.RMQ_PASSWORD,
  host: process.env.RMQ_HOST,
  port: process.env.RMQ_PORT,
}));

