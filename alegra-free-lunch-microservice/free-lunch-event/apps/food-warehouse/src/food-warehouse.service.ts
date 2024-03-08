import {
  FOOD_WAREHOUSE_LOGGER_SERVICE,
  Ingredients,
  ShoppingHistory,
} from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { lastValueFrom } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FoodWarehouseService {
  private readonly logger = new Logger(FOOD_WAREHOUSE_LOGGER_SERVICE);

  constructor(
    @InjectModel(ShoppingHistory)
    private readonly shoppingHistoryModel: typeof ShoppingHistory,
    private readonly httpService: HttpService,
    private readonly sequelize: Sequelize,
    @InjectModel(Ingredients)
    private readonly ingredientsModel: typeof Ingredients,
  ) {}

  async addShoppingHistory(ingredientsNames: string[]) {
    // Recibe array de ingredientes
    //
    // Promise.all
    //   API call -> ingredienetName
    //
    //    if (API call(axios)) -> ok && buyed > 0
    //     try
    //      Open Transaction
    //       ingredients = ingredients + buyed
    //       create Shopping History
    //
    //

    const promises = await Promise.all(
      ingredientsNames.map(async (name) => {
        try {
          const ingredientsBoughtObsr = this.httpService.get(
            `https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${name}`,
          );
          const ingredientsBought = await lastValueFrom(ingredientsBoughtObsr);
          if (
            ingredientsBought.status == 200 &&
            ingredientsBought.data?.quantitySold > 0
          ) {
            const transaction = await this.sequelize.transaction();
            try {
              const ingredient = await this.ingredientsModel.findOne({
                where: { name },
              });

              const quantity_stock =
                ingredient.quantity_stock +
                ingredientsBought.data?.quantitySold;

              await ingredient.update({ quantity_stock }, { transaction });

              const shoppingHistory = await this.shoppingHistoryModel.create({
                ingredient_id: ingredient.id,
                quantity_buyed: ingredientsBought.data?.quantitySold,
              });
              await transaction.commit();
            } catch (error) {
              // Notifiication service, socket, mails, etc...
              await transaction.rollback();
              this.logger.error(error.status ? error.status : '500');
              this.logger.error(error.message ? error.message : 'error');
            }
          }
        } catch (error) {
          this.logger.error(error.status ? error.status : '500');
          this.logger.error(error.message ? error.message : 'error');
        }
      }),
    );
    return promises;
  }

  async findAndCountShoppingHistory(
    query: any,
  ): Promise<{ rows: ShoppingHistory[]; count: number }> {
    const options: any = {
      where: {},
      order: [],
    };

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    //This value expect and array, is transformed by the DTO
    const { ids } = query;
    if (ids) {
      options.where.id = ids;
    }

    const { ingredients_ids } = query;
    if (ingredients_ids) {
      options.where.ingredient_id = ingredients_ids;
    }

    const { quantity_buyed } = query;
    if (quantity_buyed) {
      options.where.quantity_buyed = quantity_buyed;
    }

    const { created_at_order } = query;
    if (created_at_order) {
      options.order.push(['created_at', `${created_at_order}`]);
    }

    options.distinct = true;

    return this.shoppingHistoryModel.findAndCountAll(options);
  }
}
