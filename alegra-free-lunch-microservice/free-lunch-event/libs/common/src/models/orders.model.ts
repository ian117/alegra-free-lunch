import {
  Column,
  DataType,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { AbstractModel } from '../database/abstract.model';
import { Recipes } from './recipes.model';
import { STATUS_OPTIONS } from '../constants';

@Table({
  tableName: 'orders',
  modelName: 'Orders',
})
export class Orders extends AbstractModel<Orders> {
  @AllowNull(false)
  @Column(DataType.ENUM(...STATUS_OPTIONS))
  status: string;

  @AllowNull(false)
  @ForeignKey(() => Recipes)
  @Column(DataType.UUID)
  recipe_id: string;

  /* Associations */

  @BelongsTo(() => Recipes, 'recipe_id')
  recipe: Recipes;
}
