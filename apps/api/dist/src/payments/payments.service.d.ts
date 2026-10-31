import { OrderStatus } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./payment.dto";
export declare class PaymentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePaymentDto, idempotencyKey: string): Promise<{
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            couponCode: string | null;
            status: OrderStatus;
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
    private assertSameRequest;
}
