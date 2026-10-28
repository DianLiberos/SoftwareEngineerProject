import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { OrderStatus, Prisma } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePaymentDto } from "./payment.dto";

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto, idempotencyKey: string) {
    const existing = await this.prisma.payment.findUnique({
      where: { idempotencyKey },
      include: { order: true },
    });
    if (existing) {
      this.assertSameRequest(existing, dto);
      return existing;
    }

    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const order = await tx.order.findUnique({ where: { id: dto.orderId } });
          if (!order) {
            throw new NotFoundException("Order not found");
          }
          if (order.status !== OrderStatus.PENDING) {
            throw new ConflictException("Only pending orders can be paid");
          }

          const updated = await tx.order.updateMany({
            where: { id: order.id, status: OrderStatus.PENDING },
            data: { status: OrderStatus.PAID },
          });
          if (updated.count !== 1) {
            throw new ConflictException("Order was paid or changed concurrently");
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
              throw new ConflictException("Coupon no longer exists");
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
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const payment = await this.prisma.payment.findUnique({
          where: { idempotencyKey },
          include: { order: true },
        });
        if (payment) {
          this.assertSameRequest(payment, dto);
          return payment;
        }
        throw new ConflictException("This order already has a payment");
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        const payment = await this.prisma.payment.findUnique({
          where: { idempotencyKey },
          include: { order: true },
        });
        if (payment) {
          this.assertSameRequest(payment, dto);
          return payment;
        }
        throw new ConflictException("Order changed concurrently; retry payment");
      }
      throw error;
    }
  }

  private assertSameRequest(
    payment: {
      orderId: string;
      method: string;
      order: { total: number };
    },
    dto: CreatePaymentDto,
  ) {
    if (payment.orderId !== dto.orderId || payment.method !== dto.method) {
      throw new ConflictException(
        "Idempotency-Key was already used for a different payment request",
      );
    }
  }
}
