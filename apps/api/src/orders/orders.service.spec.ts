import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { DiscountType, OrderStatus } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { OrdersService } from "./orders.service";

describe("OrdersService (Unit Tests - Task 10 & Bareme)", () => {
  let service: OrdersService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      order: {
        findUnique: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        create: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
      coupon: {
        findUnique: jest.fn(),
      },
      couponRedemption: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
      ingredient: {
        update: jest.fn(),
        updateMany: jest.fn(),
      },
      $transaction: jest.fn((callback) => callback(mockPrisma)),
    };

    service = new OrdersService(mockPrisma as unknown as PrismaService);
  });

  describe("1. Order State Machine (Task 10.1 & Task 10a)", () => {
    it("cho phép các bước chuyển đổi hợp lệ trong chu trình đơn hàng (PENDING -> PAID -> PREPARING -> READY -> COMPLETED)", async () => {
      // PENDING -> PAID
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.PENDING,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.PAID,
      } as any);
      const res1 = await service.transition("order-1", OrderStatus.PAID);
      expect(res1?.status).toBe(OrderStatus.PAID);

      // PAID -> PREPARING
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.PAID,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.PREPARING,
      } as any);
      const res2 = await service.transition("order-1", OrderStatus.PREPARING);
      expect(res2?.status).toBe(OrderStatus.PREPARING);

      // PREPARING -> READY
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.PREPARING,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.READY,
      } as any);
      const res3 = await service.transition("order-1", OrderStatus.READY);
      expect(res3?.status).toBe(OrderStatus.READY);

      // READY -> COMPLETED
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.READY,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-1",
        status: OrderStatus.COMPLETED,
      } as any);
      const res4 = await service.transition("order-1", OrderStatus.COMPLETED);
      expect(res4?.status).toBe(OrderStatus.COMPLETED);
    });

    it("cho phép luồng ngoại lệ: PENDING -> PAYMENT_FAILED -> PAID (khách thử lại thanh toán thành công)", async () => {
      // PENDING -> PAYMENT_FAILED
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-2",
        status: OrderStatus.PENDING,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-2",
        status: OrderStatus.PAYMENT_FAILED,
      } as any);
      const res1 = await service.transition("order-2", OrderStatus.PAYMENT_FAILED);
      expect(res1?.status).toBe(OrderStatus.PAYMENT_FAILED);

      // PAYMENT_FAILED -> PAID
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-2",
        status: OrderStatus.PAYMENT_FAILED,
      });
      mockPrisma.order.updateMany.mockResolvedValueOnce({ count: 1 });
      jest.spyOn(service, "findOne").mockResolvedValueOnce({
        id: "order-2",
        status: OrderStatus.PAID,
      } as any);
      const res2 = await service.transition("order-2", OrderStatus.PAID);
      expect(res2?.status).toBe(OrderStatus.PAID);
    });

    it("chặn và ném ConflictException khi nhảy cóc trạng thái (PENDING -> COMPLETED)", async () => {
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-3",
        status: OrderStatus.PENDING,
      });

      await expect(
        service.transition("order-3", OrderStatus.COMPLETED),
      ).rejects.toThrow(ConflictException);
    });

    it("chặn và ném ConflictException khi đổi trạng thái từ đơn đã hủy (CANCELLED -> PREPARING)", async () => {
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-4",
        status: OrderStatus.CANCELLED,
      });

      await expect(
        service.transition("order-4", OrderStatus.PREPARING),
      ).rejects.toThrow(ConflictException);
    });

    it("chặn và ném ConflictException khi hủy đơn đã hoàn thành (COMPLETED -> CANCELLED)", async () => {
      mockPrisma.order.findUnique.mockResolvedValueOnce({
        id: "order-5",
        status: OrderStatus.COMPLETED,
      });

      await expect(
        service.cancelOrder("order-5", "Cancel completed"),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("2. Kiểm soát tồn kho nguyên liệu (Ingredient & Recipe Stock)", () => {
    const mockUser = { id: "user-1" };
    const mockProduct = {
      id: "prod-cf-sua",
      name: "Cà phê sữa",
      price: 25000,
      sizes: [
        {
          id: "size-m",
          name: "M",
          priceDelta: 0,
          recipe: [
            {
              ingredientId: "ing-cf",
              quantity: 20, // cần 20g cà phê
              ingredient: {
                id: "ing-cf",
                name: "Hạt cà phê Robusta",
                unit: "GRAM",
                stockQuantity: 100, // đủ 5 ly
                stockVersion: 1,
              },
            },
            {
              ingredientId: "ing-sua",
              quantity: 50, // cần 50ml sữa
              ingredient: {
                id: "ing-sua",
                name: "Sữa đặc",
                unit: "ML",
                stockQuantity: 200, // đủ 4 ly
                stockVersion: 1,
              },
            },
          ],
        },
      ],
      toppings: [],
    };

    it("tạo đơn thành công và trừ tồn kho nguyên liệu khi còn đủ nguyên liệu", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      mockPrisma.ingredient.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.order.create.mockResolvedValue({
        id: "order-success",
        total: 50000,
        status: OrderStatus.PENDING,
      });

      const result = await service.create({
        userId: "user-1",
        items: [
          {
            productId: "prod-cf-sua",
            quantity: 2,
            sizeName: "M",
          },
        ],
      });

      expect(result.id).toBe("order-success");
      // Cần 2 ly x 20g = 40g cà phê
      expect(mockPrisma.ingredient.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: "ing-cf", stockVersion: 1 }),
          data: expect.objectContaining({
            stockQuantity: { decrement: 40 },
          }),
        }),
      );
      // Cần 2 ly x 50ml = 100ml sữa
      expect(mockPrisma.ingredient.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ id: "ing-sua", stockVersion: 1 }),
          data: expect.objectContaining({
            stockQuantity: { decrement: 100 },
          }),
        }),
      );
    });

    it("ném ConflictException khi một trong các nguyên liệu không đủ tồn kho hoặc xung đột", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      // updateMany trả về count: 0 (không thỏa mãn stockQuantity: { gte: needed.quantity })
      mockPrisma.ingredient.updateMany.mockResolvedValue({ count: 0 });

      await expect(
        service.create({
          userId: "user-1",
          items: [
            {
              productId: "prod-cf-sua",
              quantity: 1,
              sizeName: "M",
            },
          ],
        }),
      ).rejects.toThrow(ConflictException);
    });

    it("hoàn trả nguyên liệu vào kho khi hủy đơn hàng (cancelOrder)", async () => {
      const orderToCancel = {
        id: "order-to-cancel",
        status: OrderStatus.PENDING,
        items: [
          {
            ingredients: [
              { ingredientId: "ing-cf", quantity: 40 },
              { ingredientId: "ing-sua", quantity: 100 },
            ],
          },
        ],
      };

      mockPrisma.order.findUnique.mockResolvedValue(orderToCancel);
      mockPrisma.order.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.ingredient.update.mockResolvedValue({});
      jest.spyOn(service, "findOne").mockResolvedValue({
        ...orderToCancel,
        status: OrderStatus.CANCELLED,
      } as any);

      await service.cancelOrder("order-to-cancel", "Khách hàng đổi ý");

      // Kiểm tra hoàn trả lại đúng số lượng nguyên liệu
      expect(mockPrisma.ingredient.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "ing-cf" },
          data: expect.objectContaining({
            stockQuantity: { increment: 40 },
          }),
        }),
      );
      expect(mockPrisma.ingredient.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "ing-sua" },
          data: expect.objectContaining({
            stockQuantity: { increment: 100 },
          }),
        }),
      );
    });
  });

  describe("3. Tính toán tổng tiền, Size, Topping và Coupon giảm giá", () => {
    const mockUser = { id: "user-1" };
    const mockProduct = {
      id: "prod-tra-sua",
      name: "Trà sữa",
      price: 30000, // Giá gốc
      sizes: [
        {
          id: "size-l",
          name: "L",
          price: 6000, // Thêm 6.000đ cho Size L
          recipe: [
            {
              ingredientId: "ing-tra",
              quantity: 10,
              ingredient: {
                id: "ing-tra",
                name: "Trà",
                unit: "GRAM",
                stockQuantity: 1000,
                stockVersion: 1,
              },
            },
          ],
        },
      ],
      toppings: [
        { id: "top-tc", name: "Trân châu đen", price: 5000 },
        { id: "top-thach", name: "Thạch cà phê", price: 5000 },
      ],
    };

    it("tính đúng tổng tiền khi có Size L (+6.000) và 2 Topping (+10.000)", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      mockPrisma.ingredient.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.order.create.mockImplementation((args: any) => ({
        id: "order-test",
        ...args.data,
      }));

      await service.create({
        userId: "user-1",
        items: [
          {
            productId: "prod-tra-sua",
            quantity: 2,
            sizeName: "L",
            toppings: ["Trân châu đen", "Thạch cà phê"],
          },
        ],
      });

      // Đơn giá 1 ly = 30.000 + 6.000 (Size L) + 5.000 (Trân châu) + 5.000 (Thạch) = 46.000đ
      // 2 ly = 92.000đ
      expect(mockPrisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            total: 92000,
          }),
        }),
      );
    });

    it("áp dụng Coupon giảm giá phần trăm (PERCENTAGE) chính xác", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      mockPrisma.ingredient.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.coupon.findUnique.mockResolvedValue({
        id: "coupon-1",
        code: "DISCOUNT10",
        discountType: DiscountType.PERCENTAGE,
        value: 10, // 10%
        minimumOrderAmount: 40000,
        maximumDiscount: null,
        activeFrom: null,
        activeUntil: null,
        maxUses: 100,
        usedCount: 0,
        isActive: true,
      });

      mockPrisma.order.create.mockImplementation((args: any) => ({
        id: "order-test",
        ...args.data,
      }));

      await service.create({
        userId: "user-1",
        items: [
          {
            productId: "prod-tra-sua",
            quantity: 2, // 2 x 46.000 = 92.000đ
            sizeName: "L",
            toppings: ["Trân châu đen", "Thạch cà phê"],
          },
        ],
        couponCode: "DISCOUNT10",
      });

      // Giảm 10% của 92.000đ = 9.200đ -> Còn 82.800đ
      expect(mockPrisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            discountAmount: 9200,
            total: 82800,
          }),
        }),
      );
    });

    it("áp dụng Coupon giảm tiền cố định (FIXED) chính xác", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      mockPrisma.ingredient.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.coupon.findUnique.mockResolvedValue({
        id: "coupon-fixed",
        code: "GIAM20K",
        discountType: DiscountType.FIXED,
        value: 20000, // Giảm 20.000đ
        minimumOrderAmount: 50000,
        maximumDiscount: null,
        activeFrom: null,
        activeUntil: null,
        maxUses: 100,
        usedCount: 0,
        isActive: true,
      });

      mockPrisma.order.create.mockImplementation((args: any) => ({
        id: "order-test",
        ...args.data,
      }));

      await service.create({
        userId: "user-1",
        items: [
          {
            productId: "prod-tra-sua",
            quantity: 2, // 92.000đ
            sizeName: "L",
            toppings: ["Trân châu đen", "Thạch cà phê"],
          },
        ],
        couponCode: "GIAM20K",
      });

      // 92.000 - 20.000 = 72.000đ
      expect(mockPrisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            discountAmount: 20000,
            total: 72000,
          }),
        }),
      );
    });

    it("từ chối coupon nếu tổng đơn chưa đạt giá trị tối thiểu (minOrderValue)", async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);
      mockPrisma.coupon.findUnique.mockResolvedValue({
        id: "coupon-high",
        code: "VIP100K",
        discountType: DiscountType.FIXED,
        value: 50000,
        minimumOrderAmount: 200000, // Yêu cầu đơn từ 200.000đ
        maximumDiscount: null,
        activeFrom: null,
        activeUntil: null,
        maxUses: 100,
        usedCount: 0,
        isActive: true,
      });

      await expect(
        service.create({
          userId: "user-1",
          items: [
            {
              productId: "prod-tra-sua",
              quantity: 1, // Chỉ 46.000đ < 200.000đ
              sizeName: "L",
              toppings: ["Trân châu đen", "Thạch cà phê"],
            },
          ],
          couponCode: "VIP100K",
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
