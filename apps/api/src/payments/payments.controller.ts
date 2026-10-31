import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from "@nestjs/common";
import { CreatePaymentDto } from "./payment.dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(
    @Body() dto: CreatePaymentDto,
    @Headers("idempotency-key") idempotencyKey?: string,
  ) {
    if (!idempotencyKey?.trim()) {
      throw new BadRequestException("Idempotency-Key header is required");
    }
    return this.paymentsService.create(dto, idempotencyKey.trim());
  }
}
