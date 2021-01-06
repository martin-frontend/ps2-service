import { AppModule } from './app.module';
import { CommandService,CommandModule } from 'nestjs-command';
import { NestFactory } from '@nestjs/core';
(async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false // no logger
  });
  app
    .select(CommandModule)
    .get(CommandService)
    .exec();
})();