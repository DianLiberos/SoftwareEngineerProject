import { CreatePaymentDto } from "./payment.dto";
import { PaymentsService } from "./payments.service";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(dto: CreatePaymentDto, idempotencyKey?: string): Promise<{
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            couponCode: string | null;
            status: import("../generated/prisma/enums").OrderStatus;
            subtotal: number;
            discountAmount: number;
            total: number;
        };
    } & {
        id: string;
        createdAt: Date;
        status: string;
        orderId: string;
        method: import("../generated/prisma/enums").PaymentMethod;
        idempotencyKey: string;
        amount: number;
    }>;
}
