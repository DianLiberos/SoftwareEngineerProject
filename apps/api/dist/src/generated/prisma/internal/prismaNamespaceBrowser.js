"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.JsonNullValueInput = exports.SortOrder = exports.CouponRedemptionScalarFieldEnum = exports.CouponScalarFieldEnum = exports.PaymentScalarFieldEnum = exports.OrderItemScalarFieldEnum = exports.OrderScalarFieldEnum = exports.ProductToppingScalarFieldEnum = exports.ProductSizeScalarFieldEnum = exports.ProductScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = require("@prisma/client/runtime/index-browser");
exports.Decimal = runtime.Decimal;
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
//# sourceMappingURL=prismaNamespaceBrowser.js.map