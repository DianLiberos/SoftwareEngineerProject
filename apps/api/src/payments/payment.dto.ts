import { PaymentMethod } from "../generated/prisma/client";
import { IsBoolean, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  @MinLength(1)
  orderId!: string;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsOptional()
  @IsBoolean()
  simulateFailure?: boolean;
}
