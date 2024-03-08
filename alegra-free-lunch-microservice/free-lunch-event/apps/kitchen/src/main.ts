import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { KitchenModule } from './kitchen.module';

async function bootstrap() {
  const app = await NestFactory.create(KitchenModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // With Docker
      // host: 'localhost',
      port: configService.get('KITCHEN_TCP_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.init();
}
bootstrap();
