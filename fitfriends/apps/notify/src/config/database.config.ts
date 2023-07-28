import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  databaseName: process.env.NOTIFY_MONGO_DB,
  host: process.env.NOTIFY_MONGO_HOST,
  port: parseInt(process.env.NOTIFY_MONGO_PORT, 10),
  user: process.env.NOTIFY_MONGO_USER,
  password: process.env.NOTIFY_MONGO_PASSWORD,
  authBase: process.env.NOTIFY_MONGO_AUTH_BASE,
}));
