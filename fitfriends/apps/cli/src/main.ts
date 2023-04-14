#!/usr/bin/env node
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app/app.module';
import { CliLoggerService } from './app/cli-logger.service';

async function bootstrap() {
  await CommandFactory.run(AppModule, new CliLoggerService( ))
  // Logger.log(`🚀 Fitfriends CLI application is running`);
}

bootstrap();
