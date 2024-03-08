import {
  FOOD_WAREHOUSE_SERVICE,
  Ingredients,
  KITCHEN_TASK_LOGGER_SERVICE,
  Orders,
  Recipes,
  STATUS_OPTIONS,
} from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { lastValueFrom } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class TasksService {
  private readonly logger = new Logger(KITCHEN_TASK_LOGGER_SERVICE);
  constructor(
    @InjectModel(Ingredients)
    private readonly ingredientsModel: typeof Ingredients,
    @InjectModel(Recipes)
    private readonly recipesModel: typeof Recipes,
    @InjectModel(Orders)
    private readonly ordersModel: typeof Orders,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly sequelize: Sequelize,
    @Inject(FOOD_WAREHOUSE_SERVICE)
    private readonly foodWarehouseService: ClientProxy,
  ) {}

  // Make another part where the cooking of orders make it happen
  //    if in-process orders exist
  //    Get 20 ASC ordersIDS
  //
  //    For every order
  //      Get ordersIDS -> with Ingredients__id_name -> quantity_required   One for One (check ingredients stock)
  //
  //        const ingredientsNames: []
  //        For every_ingredient:
  //          If (quantity_required > ingredients) ingredientsNames.push(ingredient.name)
  //
  //         if (ingredientsNames.length > 0)
  //          await ask Microservice add-ingredients (ingredientsNames)
  //          continue
  //
  //        transaction open
  //          update ingredients;
  //          update order_status -> finished;
  //
  //        // Aqui podriamos poner otro servicio de notificaciones
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'cook-orders' })
  async cookOrders() {
    const job = this.schedulerRegistry.getCronJob('cook-orders');
    job.stop();

    try {
      const ordersIds = await this.ordersModel.findAndCountAll({
        where: { status: STATUS_OPTIONS[1] }, // in-process
        attributes: ['id', 'status', 'created_at'],
        order: [['created_at', 'ASC']],
        limit: 30,
        offset: 0,
      });

      if (ordersIds.count < 1) {
        return;
      }

      for (
        let orderIndex = 0;
        orderIndex < ordersIds.rows.length;
        orderIndex++
      ) {
        const orderWithQuantities: any = await this.ordersModel.findOne({
          where: { id: ordersIds.rows[orderIndex].id },
          attributes: ['id', 'status', 'created_at'],
          plain: true,
          include: [
            {
              model: Recipes,
              attributes: ['id'],
              include: [
                {
                  model: Ingredients,
                  attributes: ['id', 'name', 'quantity_stock'],
                  through: {
                    attributes: ['quantity_required'],
                    as: 'pivot',
                  },
                },
              ],
            },
          ],
        });
        if (!orderWithQuantities) continue;
        const ingredientsNames = [];
        for (
          let ingredientIndex = 0;
          ingredientIndex < orderWithQuantities.recipe.ingredients.length;
          ingredientIndex++
        ) {
          if (
            orderWithQuantities.recipe.ingredients[ingredientIndex].pivot
              .quantity_required >
            orderWithQuantities.recipe.ingredients[ingredientIndex]
              .quantity_stock
          ) {
            ingredientsNames.push(
              orderWithQuantities.recipe.ingredients[ingredientIndex].name,
            );
          }
        }

        if (ingredientsNames.length > 0) {
          const buyIngredientsObsr = this.foodWarehouseService.send(
            'add-shopping-history',
            {
              ingredientsNames,
            },
          );

          await lastValueFrom(buyIngredientsObsr);

          continue;
        }

        const transaction = await this.sequelize.transaction();
        try {
          for (
            let ingredientIndex = 0;
            ingredientIndex < orderWithQuantities.recipe.ingredients.length;
            ingredientIndex++
          ) {
            const ingredient = await this.ingredientsModel.findOne({
              where: {
                id: orderWithQuantities.recipe.ingredients[ingredientIndex].id,
              },
            });

            await ingredient.update(
              {
                quantity_stock:
                  orderWithQuantities.recipe.ingredients[ingredientIndex]
                    .quantity_stock -
                  orderWithQuantities.recipe.ingredients[ingredientIndex].pivot
                    .quantity_required,
              },
              { transaction },
            );
          }

          const order = await this.ordersModel.findOne({
            where: { id: orderWithQuantities.id },
          });

          await order.update({ status: STATUS_OPTIONS[0] }, { transaction });

          await transaction.commit();

          // Aqui podriamos poner otro servicio de notificaciones
          // Como una Call a un socket, email, etc...
          this.logger.log('Order Completed');
        } catch (error) {
          await transaction.rollback();
          this.logger.error('Error en la transaction');
          this.logger.error(error.message ? error.message : 'Error');
        }
      }
    } catch (error) {
      // Notification Service, Sentry, etc..
      this.logger.error(error.status ? error.status : '500');
      this.logger.error(error.message ? error.message : 'error');
    } finally {
      job.start();
    }
  }
}
