import {
  Column,
  DataType,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  Model,
  PrimaryKey,
} from 'sequelize-typescript';

import { Ingredients } from './ingredients.model';

@Table({
  tableName: 'shopping_history',
  modelName: 'ShoppingHistory',
})
export class ShoppingHistory extends Model<ShoppingHistory> {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
  })
  id: string;

  @AllowNull(false)
  @ForeignKey(() => Ingredients)
  @Column(DataType.UUID())
  ingredient_id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER())
  quantity_buyed: number;

  /* Associations */

  @BelongsTo(() => Ingredients, 'ingredient_id')
  ingredient: Ingredients;
}
