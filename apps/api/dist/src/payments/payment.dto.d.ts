import { PaymentMethod } from "../generated/prisma/client";
export declare class CreatePaymentDto {
    orderId: string;
    method: PaymentMethod;
}
