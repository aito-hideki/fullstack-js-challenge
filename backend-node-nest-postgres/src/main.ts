import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { NODE_ENV } = process.env;
  NODE_ENV === 'development' && app.enableCors();

  await app.listen(3000);
}
bootstrap();
