import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CancelOrderDto, CreateOrderDto, UpdateOrderStatusDto } from "./order.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get("user/:userId")
  findByUser(@Param("userId") userId: string) {
    return this.ordersService.findByUser(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.transition(id, dto.status);
  }

  @Patch(":id/cancel")
  cancel(@Param("id") id: string, @Body() dto?: CancelOrderDto) {
    return this.ordersService.cancelOrder(id, dto?.reason);
  }
}
