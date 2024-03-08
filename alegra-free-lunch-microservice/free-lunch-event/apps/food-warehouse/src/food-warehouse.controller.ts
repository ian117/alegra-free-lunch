import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { FoodWarehouseService } from './food-warehouse.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { string } from 'joi';

@Controller()
export class FoodWarehouseController {
  constructor(private readonly foodWarehouseService: FoodWarehouseService) {}

  @MessagePattern('filter-shopping-history')
  async filterShoppingHistory(@Payload() data) {
    return this.foodWarehouseService.findAndCountShoppingHistory(data);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @MessagePattern('add-shopping-history')
  async addShoppingHistory(@Payload() data) {
    return this.foodWarehouseService.addShoppingHistory(data.ingredientsNames);
  }
}
