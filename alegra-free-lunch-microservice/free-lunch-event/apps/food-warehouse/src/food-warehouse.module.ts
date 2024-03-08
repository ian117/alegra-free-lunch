import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import * as Joi from 'joi';

import { FoodWarehouseController } from './food-warehouse.controller';
import { FoodWarehouseService } from './food-warehouse.service';

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
        FOOD_WAREHOUSE_TCP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    HttpModule,
  ],
  controllers: [FoodWarehouseController],
  providers: [FoodWarehouseService],
})
export class FoodWarehouseModule {}
