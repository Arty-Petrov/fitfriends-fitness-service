import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipUndefinedProperties: true,
    })
  );
  await app.init();
  Logger.log(`🚀 Users application is running`);
}

bootstrap();
