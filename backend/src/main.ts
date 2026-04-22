import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as crypto from 'crypto';

// Polyfill для crypto в глобальной области
if (!global.crypto) {
  global.crypto = crypto as any;
}

import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const loggerType = process.env.LOGGER_TYPE || 'dev';
  let logger;

  switch (loggerType) {
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv':
      logger = new TskvLogger();
      break;
    case 'dev':
    default:
      logger = new DevLogger();
      break;
  }

  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
