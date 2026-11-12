import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { LoyaltyController } from "./loyalty/loyalty.controller";
import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";
import { PaymentsController } from "./payments/payments.controller";
import { PaymentsService } from "./payments/payments.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from './products/products.module'; 
import { AuthModule } from './auth/auth.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [PrismaModule, ProductsModule, AuthModule, CouponsModule],
  controllers: [
    HealthController,
    OrdersController,
    PaymentsController,
    LoyaltyController,
  ],
  providers: [OrdersService, PaymentsService],
})
export class AppModule {}
  