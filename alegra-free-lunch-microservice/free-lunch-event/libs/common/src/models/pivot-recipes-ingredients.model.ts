import {
  Column,
  DataType,
  Table,
  AllowNull,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Recipes } from './recipes.model';
import { Ingredients } from './ingredients.model';

@Table({
  tableName: 'pivot_recipes_ingredients',
  modelName: 'PivotRecipesIngredients',
})
export class PivotRecipesIngredients extends Model<PivotRecipesIngredients> {
  @ForeignKey(() => Recipes)
  @PrimaryKey
  @Column(DataType.UUID())
  recipe_id: string;

  @ForeignKey(() => Ingredients)
  @PrimaryKey
  @Column(DataType.UUID())
  ingredient_id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER())
  quantity_required: number;

  /* Associations */

  @BelongsTo(() => Recipes, 'recipe_id')
  recipe: Recipes;

  @BelongsTo(() => Ingredients, 'ingredient_id')
  ingredient: Ingredients;
}
