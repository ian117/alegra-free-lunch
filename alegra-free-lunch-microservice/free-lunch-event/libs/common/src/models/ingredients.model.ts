import {
  Column,
  DataType,
  Table,
  AllowNull,
  Unique,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import { AbstractModel } from '../database/abstract.model';
import { Recipes } from './recipes.model';
import { PivotRecipesIngredients } from './pivot-recipes-ingredients.model';
import { ShoppingHistory } from './shopping-history.model';

@Table({
  tableName: 'ingredients',
  modelName: 'Ingredients',
})
export class Ingredients extends AbstractModel<Ingredients> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(254))
  name: string;

  @AllowNull(false)
  @Column(DataType.INTEGER())
  quantity_stock: number;

  /* Associations */

  @BelongsToMany(() => Recipes, {
    through: {
      model: () => PivotRecipesIngredients,
      unique: false,
    },
  })
  recipes: Recipes[];

  @HasMany(() => ShoppingHistory, 'ingredient_id')
  shopping_history: ShoppingHistory[];
}
