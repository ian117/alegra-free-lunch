import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  FOOD_WAREHOUSE_SERVICE,
  KITCHEN_SERVICE,
  LoggerModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .default('development')
          .required(),
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        //Microservice Kitchen
        KITCHEN_HOST: Joi.string().required(),
        KITCHEN_TCP_PORT: Joi.string().required(),
        //Microservice Food Warehouse
        FOOD_WAREHOUSE_HOST: Joi.string().required(),
        FOOD_WAREHOUSE_TCP_PORT: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: KITCHEN_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('KITCHEN_HOST'),
            port: configService.get('KITCHEN_TCP_PORT'),
          },
        }),
      },
      {
        name: FOOD_WAREHOUSE_SERVICE,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('FOOD_WAREHOUSE_HOST'),
            port: configService.get('FOOD_WAREHOUSE_TCP_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
