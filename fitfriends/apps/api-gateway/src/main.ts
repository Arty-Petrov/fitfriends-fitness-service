import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_GATEWAY_APP_DEFAULT_PORT } from './app/app.constant';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('The "FitFriends" service').setDescription('Gateway API').setVersion('1.0').build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipUndefinedProperties: true,
    })
  );

  const port = process.env.PORT || API_GATEWAY_APP_DEFAULT_PORT;
  await app.listen(port);
  Logger.log(`🚀 FitFriends API is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
