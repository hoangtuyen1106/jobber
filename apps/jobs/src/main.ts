require('module-alias/register');
import { init } from '@jobber/nestjs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
}

bootstrap();
