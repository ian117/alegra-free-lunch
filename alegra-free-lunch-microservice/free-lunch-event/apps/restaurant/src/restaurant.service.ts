import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  FOOD_WAREHOUSE_SERVICE,
  Ingredients,
  KITCHEN_SERVICE,
  Orders,
  RESTAURANT_LOGGER_SERVICE,
  Recipes,
} from '@app/common';

@Injectable()
export class RestaurantService {
  protected readonly logger = new Logger(RESTAURANT_LOGGER_SERVICE);
  constructor(
    @InjectModel(Orders)
    private readonly ordersModel: typeof Orders,
    @InjectModel(Recipes)
    private readonly recipesModel: typeof Recipes,
    @Inject(KITCHEN_SERVICE) private readonly kitchenService: ClientProxy,
    @Inject(FOOD_WAREHOUSE_SERVICE)
    private readonly foodWarehouseService: ClientProxy,
  ) {}

  async findAndCountOrders(
    query: any,
  ): Promise<{ rows: Orders[]; count: number }> {
    const options: any = {
      where: {},
      order: [],
      include: [
        {
          model: Recipes,
          attributes: ['name'],
        },
      ],
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

    const { status } = query;
    if (status) {
      options.where.status = status;
    }

    const { created_at_order } = query;
    if (created_at_order) {
      options.order.push(['created_at', `${created_at_order}`]);
    }

    options.distinct = true;

    return this.ordersModel.findAndCountAll(options);
  }

  async findAndCountRecipes(
    query: any,
  ): Promise<{ rows: Recipes[]; count: number }> {
    const options: any = {
      where: {},
      // order: [],
      include: [
        {
          model: Ingredients,
          attributes: ['name', 'quantity_stock'],
          through: {
            attributes: [],
          },
        },
      ],
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

    const { name } = query;
    if (name) {
      options.where.name = { [Op.iLike]: `${name}` };
    }

    options.distinct = true;

    return this.recipesModel.findAndCountAll(options);
  }

  /** RPC MessagePattern communication*/

  async placeOrder() {
    try {
      const orderObsr = this.kitchenService.send('add-order', {});
      const order = await lastValueFrom(orderObsr);
      return order;
    } catch (error) {
      // Notification Service, Sentry, etc..
      this.logger.warn(error.status ? error.status : '500');
      this.logger.warn(error.message ? error.message : 'error');
      throw new HttpException(
        error.message ? error.message : 'error',
        error.status ? error.status : '500',
      );
    }
  }

  async filterIngredients(query) {
    try {
      const ingredientsObsr = this.kitchenService.send('filter-ingredients', {
        ...query,
      });
      const ingredients = await lastValueFrom(ingredientsObsr);
      return ingredients;
    } catch (error) {
      // Notification Service, Sentry, etc..
      this.logger.warn(error.status ? error.status : '500');
      this.logger.warn(error.message ? error.message : 'error');
      throw new HttpException(
        error.message ? error.message : 'error',
        error.status ? error.status : '500',
      );
    }
  }

  async filterShoppingHistory(query) {
    try {
      const shoppingHistoryObsr = this.foodWarehouseService.send(
        'filter-shopping-history',
        {
          ...query,
        },
      );
      const shoppingHistory = await lastValueFrom(shoppingHistoryObsr);
      return shoppingHistory;
    } catch (error) {
      // Notification Service, Sentry, etc..
      this.logger.warn(error.status ? error.status : '500');
      this.logger.warn(error.message ? error.message : 'error');
      throw new HttpException(
        error.message ? error.message : 'error',
        error.status ? error.status : '500',
      );
    }
  }
}
