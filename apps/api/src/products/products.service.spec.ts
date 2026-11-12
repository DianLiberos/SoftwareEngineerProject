import { NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductsService } from "./products.service";

describe("ProductsService (Unit Tests - Derived Stock from Recipe)", () => {
  let service: ProductsService;
  let mockPrisma: any;

  beforeEach(() => {
    mockPrisma = {
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    service = new ProductsService(mockPrisma as unknown as PrismaService);
  });

  describe("Công thức tính tồn kho suy diễn (Derived Stock)", () => {
    it("tính đúng tồn kho khả dụng bằng giá trị nhỏ nhất giữa các nguyên liệu trong công thức (Math.floor(stockQuantity / quantity))", async () => {
      const mockProduct = {
        id: "prod-cf",
        name: "Cà phê sữa",
        sizes: [
          {
            id: "size-m",
            name: "M",
            price: 25000,
            recipe: [
              {
                quantity: 20, // 20g hạt cà phê
                ingredient: { stockQuantity: 100 }, // Đủ làm: Math.floor(100 / 20) = 5 ly
              },
              {
                quantity: 50, // 50ml sữa
                ingredient: { stockQuantity: 120 }, // Đủ làm: Math.floor(120 / 50) = 2 ly
              },
            ],
          },
          {
            id: "size-l",
            name: "L",
            price: 30000,
            recipe: [
              {
                quantity: 30, // 30g hạt cà phê
                ingredient: { stockQuantity: 100 }, // Đủ làm: Math.floor(100 / 30) = 3 ly
              },
              {
                quantity: 70, // 70ml sữa
                ingredient: { stockQuantity: 120 }, // Đủ làm: Math.floor(120 / 70) = 1 ly
              },
            ],
          },
        ],
        toppings: [],
      };

      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne("prod-cf");

      // Size M bị giới hạn bởi Sữa (chỉ đủ 2 ly)
      expect(result.sizes[0].stock).toBe(2);
      // Size L bị giới hạn bởi Sữa (chỉ đủ 1 ly)
      expect(result.sizes[1].stock).toBe(1);
      // Stock tổng của sản phẩm = max(size.stock) = 2
      expect(result.stock).toBe(2);
    });

    it("trả về stock = 0 nếu một trong các nguyên liệu bắt buộc bị hết hàng (stockQuantity = 0)", async () => {
      const mockProduct = {
        id: "prod-het-hang",
        name: "Trà đào",
        sizes: [
          {
            id: "size-m",
            name: "M",
            price: 30000,
            recipe: [
              {
                quantity: 15,
                ingredient: { stockQuantity: 500 }, // Đủ 33 ly
              },
              {
                quantity: 2, // 2 miếng đào
                ingredient: { stockQuantity: 0 }, // Hết đào -> 0 ly
              },
            ],
          },
        ],
        toppings: [],
      };

      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await service.findOne("prod-het-hang");

      expect(result.sizes[0].stock).toBe(0);
      expect(result.stock).toBe(0);
    });

    it("ném NotFoundException khi không tìm thấy món theo ID", async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(service.findOne("non-existent-id")).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
