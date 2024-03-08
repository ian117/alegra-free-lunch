import {
  Column,
  DataType,
  Table,
  AllowNull,
  HasMany,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';

import { AbstractModel } from '../database/abstract.model';
import { Orders } from './orders.model';
import { Ingredients } from './ingredients.model';
import { PivotRecipesIngredients } from './pivot-recipes-ingredients.model';

@Table({
  tableName: 'recipes',
  modelName: 'Recipes',
})
export class Recipes extends AbstractModel<Recipes> {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(254))
  name: string;

  /* Associations */

  @HasMany(() => Orders, 'recipe_id')
  orders: Orders[];

  @BelongsToMany(() => Ingredients, {
    through: {
      model: () => PivotRecipesIngredients,
      unique: false,
    },
  })
  ingredients: Ingredients[];
}
