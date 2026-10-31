import { OrderStatus } from "../generated/prisma/client";
export declare class ProductOptionDto {
    name: string;
    price?: number;
}
export declare class OrderItemDto {
    productId: string;
    quantity?: number;
    qty?: number;
    name?: string;
    basePrice?: number;
    lineTotal?: number;
    imageUrl?: string;
    size?: ProductOptionDto;
    toppings?: ProductOptionDto[];
}
export declare class CreateOrderDto {
    userId: string;
    items: OrderItemDto[];
    couponCode?: string;
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
