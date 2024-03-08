import { Controller, Get, Post, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { getPagination, getPagingData } from '@app/common';
import {
  FilterIngredientsQueryDto,
  FilterOrdersQueryDto,
  FilterRecipesQueryDto,
  FilterShoppingHistoryQueryDto,
} from './dtos/restaurant.dto';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  // Microservice Call
  @Post('/orders/')
  async placeOrder() {
    return this.restaurantService.placeOrder();
  }

  @Get('/orders/')
  async filterOrders(@Query() query: FilterOrdersQueryDto) {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size);
    query.limit = limit;
    query.offset = offset;

    const orders = await this.restaurantService.findAndCountOrders(query);
    const results = getPagingData(orders, page, limit);
    return results;
  }

  // Microservice Call
  @Get('/ingredients/')
  async filterIngredients(@Query() query: FilterIngredientsQueryDto) {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size);
    query.limit = limit;
    query.offset = offset;

    const ingredients = await this.restaurantService.filterIngredients(query);
    const results = getPagingData(ingredients, page, limit);
    return results;
  }

  // Microservice Call
  @Get('/shopping-history/')
  async filterShoppingHistory(@Query() query: FilterShoppingHistoryQueryDto) {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size);
    query.limit = limit;
    query.offset = offset;

    const shoppingHistory =
      await this.restaurantService.filterShoppingHistory(query);
    const results = getPagingData(shoppingHistory, page, limit);
    return results;
  }

  @Get('/recipes/')
  async filterRecipes(@Query() query: FilterRecipesQueryDto) {
    const { page, size } = query;
    const { limit, offset } = getPagination(page, size);
    query.limit = limit;
    query.offset = offset;

    const recipes = await this.restaurantService.findAndCountRecipes(query);
    const results = getPagingData(recipes, page, limit);
    return results;
  }
}
