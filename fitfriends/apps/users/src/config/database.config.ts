import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  databaseName: process.env.USERS_MONGO_DB,
  host: process.env.USERS_MONGO_HOST,
  port: parseInt(process.env.USERS_MONGO_PORT, 10),
  user: process.env.USERS_MONGO_USER,
  password: process.env.USERS_MONGO_PASSWORD,
  authBase: process.env.USERS_MONGO_AUTH_BASE,
}));
