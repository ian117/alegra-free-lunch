import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RestaurantModule } from './restaurant.module';

async function bootstrap() {
  const app = await NestFactory.create(RestaurantModule);
  const configService = app.get(ConfigService);
  app.enableCors({ origin: ['*', 'https://alegra-deploy-front-production.up.railway.app/'] });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      // Ignorar datos que no esten en los DTO
      whitelist: true,
      // Lanzar error si existen datos prohibidos
      forbidNonWhitelisted: true,
      // Desabilitar mensajes de error
      disableErrorMessages: false,
      transform: true,
    }),
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();
