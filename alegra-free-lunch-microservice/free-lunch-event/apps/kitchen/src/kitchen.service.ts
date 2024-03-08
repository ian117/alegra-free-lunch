import {
  Ingredients,
  KITCHEN_LOGGER_SERVICE,
  Orders,
  Recipes,
  STATUS_OPTIONS,
} from '@app/common';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class KitchenService {
  protected readonly logger = new Logger(KITCHEN_LOGGER_SERVICE);
  constructor(
    @InjectModel(Ingredients)
    private readonly ingredientsModel: typeof Ingredients,
    @InjectModel(Recipes)
    private readonly recipesModel: typeof Recipes,
    @InjectModel(Orders)
    private readonly ordersModel: typeof Orders,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findAndCountIngredients(
    query: any,
  ): Promise<{ rows: Ingredients[]; count: number }> {
    const options: any = {
      where: {},
      // order: [],
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

    const { quantity_stock } = query;
    if (quantity_stock) {
      options.where.quantity_stock = quantity_stock;
    }

    options.distinct = true;

    return this.ingredientsModel.findAndCountAll(options);
  }

  async addOrder() {
    const recipesIds = await this.recipesModel.findAndCountAll({
      attributes: ['id'],
    });

    if (recipesIds.count < 1) {
      // Notification Service, Sentry, etc...
      this.logger.warn(
        'Recipes count is zero! Run Seeders! or check implementation',
      );
      throw new RpcException(new NotFoundException('Not Found Recipes'));
    }

    const randomElement =
      recipesIds.rows[Math.floor(Math.random() * recipesIds.rows.length)];

    return this.ordersModel.create({
      id: uuid4(),
      recipe_id: randomElement.id,
      status: STATUS_OPTIONS[1],
    });
  }
}
