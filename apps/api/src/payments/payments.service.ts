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

    const simulateFailure = Boolean(dto.simulateFailure);

    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const order = await tx.order.findUnique({ where: { id: dto.orderId } });
          if (!order) {
            throw new NotFoundException("Order not found");
          }
          if (
            order.status !== OrderStatus.PENDING &&
            order.status !== OrderStatus.PAYMENT_FAILED
          ) {
            throw new ConflictException(
              "Chỉ có thể thanh toán cho đơn hàng đang chờ (PENDING) hoặc thanh toán lỗi (PAYMENT_FAILED)",
            );
          }

          if (simulateFailure) {
            // Giả lập thanh toán thất bại
            const updated = await tx.order.updateMany({
              where: {
                id: order.id,
                status: { in: [OrderStatus.PENDING, OrderStatus.PAYMENT_FAILED] },
              },
              data: { status: OrderStatus.PAYMENT_FAILED },
            });
            if (updated.count !== 1) {
              throw new ConflictException("Đơn hàng đã bị thay đổi đồng thời");
            }

            const payment = await tx.payment.upsert({
              where: { orderId: order.id },
              create: {
                orderId: order.id,
                idempotencyKey,
                method: dto.method,
                amount: order.total,
                status: "FAILED",
              },
              update: {
                idempotencyKey,
                method: dto.method,
                amount: order.total,
                status: "FAILED",
              },
              include: { order: true },
            });

            // KHÔNG hoàn kho nguyên liệu ở bước này vì đơn vẫn giữ chỗ để khách thử lại
            return {
              ...payment,
              status: "FAILED",
              message: "Giao dịch bị từ chối: Số dư tài khoản không đủ hoặc thẻ bị khóa",
            };
          }

          // Thanh toán thành công (simulateFailure === false)
          const updated = await tx.order.updateMany({
            where: {
              id: order.id,
              status: { in: [OrderStatus.PENDING, OrderStatus.PAYMENT_FAILED] },
            },
            data: { status: OrderStatus.PAID },
          });
          if (updated.count !== 1) {
            throw new ConflictException("Order was paid or changed concurrently");
          }

          const payment = await tx.payment.upsert({
            where: { orderId: order.id },
            create: {
              orderId: order.id,
              idempotencyKey,
              method: dto.method,
              amount: order.total,
              status: "SUCCEEDED",
            },
            update: {
              idempotencyKey,
              method: dto.method,
              amount: order.total,
              status: "SUCCEEDED",
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
            await tx.couponRedemption.upsert({
              where: { orderId: order.id },
              create: {
                couponId: coupon.id,
                userId: order.userId,
                orderId: order.id,
              },
              update: {
                couponId: coupon.id,
                userId: order.userId,
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
          return {
            ...payment,
            status: "SUCCEEDED",
            message: "Thanh toán thành công",
          };
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
