import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { OrderStatus, Role } from "../generated/prisma/client";
import { CancelOrderDto, CreateOrderDto, UpdateOrderStatusDto } from "./order.dto";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARISTA, Role.ADMIN)
  findAll(@Query("status") status?: OrderStatus) {
    return this.ordersService.findAll(status);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.BARISTA, Role.ADMIN)
  updateStatus(@Param("id") id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.transition(id, dto.status);
  }

  @Patch(":id/cancel")
  cancel(@Param("id") id: string, @Body() dto?: CancelOrderDto) {
    return this.ordersService.cancelOrder(id, dto?.reason);
  }
}
