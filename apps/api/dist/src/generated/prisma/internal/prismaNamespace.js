"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.CouponRedemptionScalarFieldEnum = exports.CouponScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.ProductToppingScalarFieldEnum = exports.ProductSizeScalarFieldEnum = exports.ProductScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = require("@prisma/client/runtime/client");
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Product: 'Product',
    ProductSize: 'ProductSize',
    ProductTopping: 'ProductTopping',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Payment: 'Payment',
    Coupon: 'Coupon',
    CouponRedemption: 'CouponRedemption'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    loyaltyPoints: 'loyaltyPoints',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductScalarFieldEnum = {
    id: 'id',
    name: 'name',
    price: 'price',
    stock: 'stock',
    stockVersion: 'stockVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ProductSizeScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    name: 'name',
    price: 'price'
};
exports.ProductToppingScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    name: 'name',
    price: 'price'
};
exports.OrderScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    status: 'status',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    total: 'total',
    couponCode: 'couponCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    name: 'name',
    sizeName: 'sizeName',
    sizePrice: 'sizePrice',
    toppingsPrice: 'toppingsPrice',
    toppings: 'toppings',
    unitPrice: 'unitPrice',
    quantity: 'quantity',
    lineTotal: 'lineTotal'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    idempotencyKey: 'idempotencyKey',
    method: 'method',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt'
};
exports.CouponScalarFieldEnum = {
    id: 'id',
    code: 'code',
    discountType: 'discountType',
    value: 'value',
    minimumOrderAmount: 'minimumOrderAmount',
    maximumDiscount: 'maximumDiscount',
    activeFrom: 'activeFrom',
    activeUntil: 'activeUntil',
    createdAt: 'createdAt'
};
exports.CouponRedemptionScalarFieldEnum = {
    id: 'id',
    couponId: 'couponId',
    userId: 'userId',
    orderId: 'orderId',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map