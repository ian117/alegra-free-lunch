import { NestFactory } from '@nestjs/core';
import { FoodWarehouseModule } from './food-warehouse.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(FoodWarehouseModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // With Docker
      // host: 'localhost',
      port: configService.get('FOOD_WAREHOUSE_TCP_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
