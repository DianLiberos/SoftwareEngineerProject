import { CreateOrderDto, UpdateOrderStatusDto } from "./order.dto";
import { OrdersService } from "./orders.service";
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
        status: import("../generated/prisma/enums").OrderStatus;
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
        status: import("../generated/prisma/enums").OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    })[]>;
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
        status: import("../generated/prisma/enums").OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
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
        status: import("../generated/prisma/enums").OrderStatus;
        subtotal: number;
        discountAmount: number;
        total: number;
    }>;
}
