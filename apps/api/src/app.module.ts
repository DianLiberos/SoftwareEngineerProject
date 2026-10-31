import { Module } from "@nestjs/common";
import { LoyaltyController } from "./loyalty/loyalty.controller";
import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";
import { PaymentsController } from "./payments/payments.controller";
import { PaymentsService } from "./payments/payments.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [OrdersController, PaymentsController, LoyaltyController],
  providers: [OrdersService, PaymentsService],
})
export class AppModule {}
