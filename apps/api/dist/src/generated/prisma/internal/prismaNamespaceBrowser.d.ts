import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Product: "Product";
    readonly ProductSize: "ProductSize";
    readonly ProductTopping: "ProductTopping";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Payment: "Payment";
    readonly Coupon: "Coupon";
    readonly CouponRedemption: "CouponRedemption";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly name: "name";
    readonly loyaltyPoints: "loyaltyPoints";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly price: "price";
    readonly stock: "stock";
    readonly stockVersion: "stockVersion";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductSizeScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly name: "name";
    readonly price: "price";
};
export type ProductSizeScalarFieldEnum = (typeof ProductSizeScalarFieldEnum)[keyof typeof ProductSizeScalarFieldEnum];
export declare const ProductToppingScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly name: "name";
    readonly price: "price";
};
export type ProductToppingScalarFieldEnum = (typeof ProductToppingScalarFieldEnum)[keyof typeof ProductToppingScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly status: "status";
    readonly subtotal: "subtotal";
    readonly discountAmount: "discountAmount";
    readonly total: "total";
    readonly couponCode: "couponCode";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly productId: "productId";
    readonly name: "name";
    readonly sizeName: "sizeName";
    readonly sizePrice: "sizePrice";
    readonly toppingsPrice: "toppingsPrice";
    readonly toppings: "toppings";
    readonly unitPrice: "unitPrice";
    readonly quantity: "quantity";
    readonly lineTotal: "lineTotal";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly idempotencyKey: "idempotencyKey";
    readonly method: "method";
    readonly amount: "amount";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly discountType: "discountType";
    readonly value: "value";
    readonly minimumOrderAmount: "minimumOrderAmount";
    readonly maximumDiscount: "maximumDiscount";
    readonly activeFrom: "activeFrom";
    readonly activeUntil: "activeUntil";
    readonly createdAt: "createdAt";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const CouponRedemptionScalarFieldEnum: {
    readonly id: "id";
    readonly couponId: "couponId";
    readonly userId: "userId";
    readonly orderId: "orderId";
    readonly createdAt: "createdAt";
};
export type CouponRedemptionScalarFieldEnum = (typeof CouponRedemptionScalarFieldEnum)[keyof typeof CouponRedemptionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
