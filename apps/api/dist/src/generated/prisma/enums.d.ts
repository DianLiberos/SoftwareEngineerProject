export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly COMPLETED: "COMPLETED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentMethod: {
    readonly WALLET: "WALLET";
    readonly BANK_CARD: "BANK_CARD";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const DiscountType: {
    readonly PERCENTAGE: "PERCENTAGE";
    readonly FIXED: "FIXED";
};
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
