import { OrderStatus } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./order.dto";
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto): Promise<{
        items: {
            id: string;
            name: string;
            productId: string;
            quantity: number;
            lineTotal: number;
            toppings: import("@prisma/client/runtime/client").JsonValue;
            sizeName: string | null;
            sizePrice: number;
            toppingsPrice: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        couponCode: string | null;
        status: OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    }>;
    findOne(id: string): Promise<{
        payment: {
            id: string;
            createdAt: Date;
            status: string;
            orderId: string;
            method: import("../generated/prisma/enums").PaymentMethod;
            idempotencyKey: string;
            amount: number;
        } | null;
        items: {
            id: string;
            name: string;
            productId: string;
            quantity: number;
            lineTotal: number;
            toppings: import("@prisma/client/runtime/client").JsonValue;
            sizeName: string | null;
            sizePrice: number;
            toppingsPrice: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        couponCode: string | null;
        status: OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    }>;
    findByUser(userId: string): Promise<({
        payment: {
            id: string;
            createdAt: Date;
            status: string;
            orderId: string;
            method: import("../generated/prisma/enums").PaymentMethod;
            idempotencyKey: string;
            amount: number;
        } | null;
        items: {
            id: string;
            name: string;
            productId: string;
            quantity: number;
            lineTotal: number;
            toppings: import("@prisma/client/runtime/client").JsonValue;
            sizeName: string | null;
            sizePrice: number;
            toppingsPrice: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        couponCode: string | null;
        status: OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    })[]>;
    transition(id: string, nextStatus: OrderStatus): Promise<{
        payment: {
            id: string;
            createdAt: Date;
            status: string;
            orderId: string;
            method: import("../generated/prisma/enums").PaymentMethod;
            idempotencyKey: string;
            amount: number;
        } | null;
        items: {
            id: string;
            name: string;
            productId: string;
            quantity: number;
            lineTotal: number;
            toppings: import("@prisma/client/runtime/client").JsonValue;
            sizeName: string | null;
            sizePrice: number;
            toppingsPrice: number;
            unitPrice: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        couponCode: string | null;
        status: OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    }>;
}
