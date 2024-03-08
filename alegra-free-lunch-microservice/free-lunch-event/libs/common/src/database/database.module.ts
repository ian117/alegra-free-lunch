import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';

import {
  Ingredients,
  Orders,
  PivotRecipesIngredients,
  Recipes,
  ShoppingHistory,
} from '../models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // repositoryMode: true,
        autoLoadModels: true,
        synchronize: true,
        uri: configService.get('DATABASE_URL'),
        define: {
          underscored: true,
          underscoredAll: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: 'deleted_at',
        },
        timezone: 'utc',
        logging: false,
      }),
    }),
    SequelizeModule.forFeature([
      Recipes,
      Orders,
      Ingredients,
      PivotRecipesIngredients,
      ShoppingHistory,
    ]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
