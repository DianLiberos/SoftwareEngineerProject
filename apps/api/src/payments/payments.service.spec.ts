import { ConflictException, NotFoundException } from "@nestjs/common";
import { OrderStatus } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsService } from "./payments.service";

describe("PaymentsService (Unit Tests - Task 10.2 Idempotency & Sandbox)", () => {
  let service: PaymentsService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      payment: {
        findUnique: jest.fn(),
        upsert: jest.fn(),
      },
      order: {
        findUnique: jest.fn(),
        updateMany: jest.fn(),
      },
      coupon: {
        findUnique: jest.fn(),
      },
      couponRedemption: {
        upsert: jest.fn(),
      },
      user: {
        update: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(mockPrisma)),
    };

    service = new PaymentsService(mockPrisma as unknown as PrismaService);
  });

  describe("1. Cơ chế chống trùng lặp Idempotency-Key (Task 10b)", () => {
    it("trả về giao dịch cũ mà không tạo lại khi gửi trùng Idempotency-Key", async () => {
      const existingPayment = {
        id: "pay-101",
        orderId: "order-1",
        idempotencyKey: "key-abc-123",
        amount: 50000,
        method: "WALLET",
        status: "SUCCEEDED",
      };

      mockPrisma.payment.findUnique.mockResolvedValue(existingPayment);

      const result = await service.create(
        {
          orderId: "order-1",
          method: "WALLET" as any,
        },
        "key-abc-123",
      );

      expect(result).toBe(existingPayment);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });

    it("ném ConflictException nếu Idempotency-Key bị tái sử dụng cho đơn hàng khác", async () => {
      const existingPayment = {
        id: "pay-101",
        orderId: "order-1",
        idempotencyKey: "key-abc-123",
        amount: 50000,
        method: "WALLET",
        status: "SUCCEEDED",
      };

      mockPrisma.payment.findUnique.mockResolvedValue(existingPayment);

      await expect(
        service.create(
          {
            orderId: "order-DIFFERENT",
            method: "WALLET" as any,
          },
          "key-abc-123",
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("2. Thanh toán Sandbox kịch bản Thành công (simulateFailure: false)", () => {
    it("chuyển đơn sang PAID, lưu Payment SUCCEEDED và cộng điểm Loyalty cho User", async () => {
      mockPrisma.payment.findUnique.mockResolvedValue(null);
      mockPrisma.order.findUnique.mockResolvedValue({
        id: "order-1",
        userId: "user-1",
        total: 55000,
        status: OrderStatus.PENDING,
        couponCode: null,
      });
      mockPrisma.order.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.payment.upsert.mockResolvedValue({
        id: "pay-new",
        orderId: "order-1",
        status: "SUCCEEDED",
        amount: 55000,
      });
      mockPrisma.user.update.mockResolvedValue({});

      const result = await service.create(
        {
          orderId: "order-1",
          method: "WALLET" as any,
          simulateFailure: false,
        },
        "key-fresh-999",
      );

      expect(result.status).toBe("SUCCEEDED");
      // Cập nhật trạng thái đơn sang PAID
      expect(mockPrisma.order.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { status: OrderStatus.PAID },
        }),
      );
      // Cộng 5 điểm tích lũy (55.000 / 10.000 = 5 điểm)
      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "user-1" },
          data: { loyaltyPoints: { increment: 5 } },
        }),
      );
    });

    it("cho phép thanh toán lại đơn hàng từng bị PAYMENT_FAILED", async () => {
      mockPrisma.payment.findUnique.mockResolvedValue(null);
      mockPrisma.order.findUnique.mockResolvedValue({
        id: "order-failed-before",
        userId: "user-1",
        total: 40000,
        status: OrderStatus.PAYMENT_FAILED,
        couponCode: null,
      });
      mockPrisma.order.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.payment.upsert.mockResolvedValue({
        id: "pay-retry",
        orderId: "order-failed-before",
        status: "SUCCEEDED",
        amount: 40000,
      });
      mockPrisma.user.update.mockResolvedValue({});

      const result = await service.create(
        {
          orderId: "order-failed-before",
          method: "BANK_CARD" as any,
          simulateFailure: false,
        },
        "key-retry-new",
      );

      expect(result.status).toBe("SUCCEEDED");
      expect(mockPrisma.order.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { status: OrderStatus.PAID },
        }),
      );
    });
  });

  describe("3. Thanh toán Sandbox kịch bản Lỗi (simulateFailure: true)", () => {
    it("chuyển đơn sang PAYMENT_FAILED, lưu Payment FAILED và không cộng điểm loyalty", async () => {
      mockPrisma.payment.findUnique.mockResolvedValue(null);
      mockPrisma.order.findUnique.mockResolvedValue({
        id: "order-fail-test",
        userId: "user-1",
        total: 60000,
        status: OrderStatus.PENDING,
        couponCode: null,
      });
      mockPrisma.order.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.payment.upsert.mockResolvedValue({
        id: "pay-failed-rec",
        orderId: "order-fail-test",
        status: "FAILED",
        amount: 60000,
      });

      const result = await service.create(
        {
          orderId: "order-fail-test",
          method: "WALLET" as any,
          simulateFailure: true,
        },
        "key-sim-fail",
      );

      expect(result.status).toBe("FAILED");
      expect((result as any).message).toContain("Giao dịch bị từ chối");
      expect(mockPrisma.order.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { status: OrderStatus.PAYMENT_FAILED },
        }),
      );
      // Tuyệt đối không cộng loyalty điểm khi thanh toán thất bại
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
