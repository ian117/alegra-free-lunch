import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  // Not passing DTO cause validated before
  // PD: Requirements do not ask for auth, but can be included here...
  @MessagePattern('filter-ingredients')
  async filterIngredients(@Payload() data) {
    return this.kitchenService.findAndCountIngredients(data);
  }

  @MessagePattern('add-order')
  async addOrder() {
    return this.kitchenService.addOrder();
  }
}
