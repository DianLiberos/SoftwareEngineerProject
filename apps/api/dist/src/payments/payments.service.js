"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, idempotencyKey) {
        const existing = await this.prisma.payment.findUnique({
            where: { idempotencyKey },
            include: { order: true },
        });
        if (existing) {
            this.assertSameRequest(existing, dto);
            return existing;
        }
        try {
            return await this.prisma.$transaction(async (tx) => {
                const order = await tx.order.findUnique({ where: { id: dto.orderId } });
                if (!order) {
                    throw new common_1.NotFoundException("Order not found");
                }
                if (order.status !== client_1.OrderStatus.PENDING) {
                    throw new common_1.ConflictException("Only pending orders can be paid");
                }
                const updated = await tx.order.updateMany({
                    where: { id: order.id, status: client_1.OrderStatus.PENDING },
                    data: { status: client_1.OrderStatus.PAID },
                });
                if (updated.count !== 1) {
                    throw new common_1.ConflictException("Order was paid or changed concurrently");
                }
                const payment = await tx.payment.create({
                    data: {
                        orderId: order.id,
                        idempotencyKey,
                        method: dto.method,
                        amount: order.total,
                    },
                    include: { order: true },
                });
                if (order.couponCode) {
                    const coupon = await tx.coupon.findUnique({
                        where: { code: order.couponCode },
                        select: { id: true },
                    });
                    if (!coupon) {
                        throw new common_1.ConflictException("Coupon no longer exists");
                    }
                    await tx.couponRedemption.create({
                        data: {
                            couponId: coupon.id,
                            userId: order.userId,
                            orderId: order.id,
                        },
                    });
                }
                const points = Math.floor(order.total / 10_000);
                if (points > 0) {
                    await tx.user.update({
                        where: { id: order.userId },
                        data: { loyaltyPoints: { increment: points } },
                    });
                }
                return payment;
            }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                const payment = await this.prisma.payment.findUnique({
                    where: { idempotencyKey },
                    include: { order: true },
                });
                if (payment) {
                    this.assertSameRequest(payment, dto);
                    return payment;
                }
                throw new common_1.ConflictException("This order already has a payment");
            }
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2034") {
                const payment = await this.prisma.payment.findUnique({
                    where: { idempotencyKey },
                    include: { order: true },
                });
                if (payment) {
                    this.assertSameRequest(payment, dto);
                    return payment;
                }
                throw new common_1.ConflictException("Order changed concurrently; retry payment");
            }
            throw error;
        }
    }
    assertSameRequest(payment, dto) {
        if (payment.orderId !== dto.orderId || payment.method !== dto.method) {
            throw new common_1.ConflictException("Idempotency-Key was already used for a different payment request");
        }
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map