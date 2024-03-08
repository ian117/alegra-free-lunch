import { Module } from '@nestjs/common';
import {
  DatabaseModule,
  FOOD_WAREHOUSE_SERVICE,
  LoggerModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as Joi from 'joi';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import { TasksService } from './task-scheduling/task.service';
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
        KITCHEN_TCP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    ClientsModule.registerAsync([
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
  controllers: [KitchenController],
  providers: [KitchenService, TasksService],
})
export class KitchenModule {}
