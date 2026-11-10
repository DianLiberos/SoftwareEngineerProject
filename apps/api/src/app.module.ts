import { Module } from "@nestjs/common";
import { LoyaltyController } from "./loyalty/loyalty.controller";
import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";
import { PaymentsController } from "./payments/payments.controller";
import { PaymentsService } from "./payments/payments.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from './products/products.module'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ProductsModule, AuthModule],
  controllers: [OrdersController, PaymentsController, LoyaltyController],
  providers: [OrdersService, PaymentsService],
})
export class AppModule {}
