import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DiscountType, OrderStatus, Prisma } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./order.dto";

const allowedTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
  [OrderStatus.PAID]: [OrderStatus.PREPARING],
  [OrderStatus.PREPARING]: [OrderStatus.READY],
  [OrderStatus.READY]: [OrderStatus.COMPLETED],
};

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await this.prisma.$transaction(
          async (tx) => {
            const user = await tx.user.findUnique({
              where: { id: dto.userId },
              select: { id: true },
            });
            if (!user) {
              throw new NotFoundException("User not found");
            }

            const normalizedItems = dto.items.map((item) => {
              const quantity = item.quantity ?? item.qty ?? 0;
              if (!quantity || quantity < 1) {
                throw new BadRequestException(
                  `Item ${item.productId ?? "unknown"} must include a positive quantity`,
                );
              }
              return { ...item, quantity };
            });

            const quantities = new Map<string, number>();
            for (const item of normalizedItems) {
              quantities.set(
                item.productId,
                (quantities.get(item.productId) ?? 0) + item.quantity,
              );
            }

            const products = await tx.product.findMany({
              where: { id: { in: [...quantities.keys()] } },
              include: { sizes: true, toppings: true },
            });
            if (products.length !== quantities.size) {
              throw new NotFoundException("One or more products were not found");
            }

            const productsById = new Map(products.map((product) => [product.id, product]));
            const lines = normalizedItems.map((item) => {
              const product = productsById.get(item.productId);
              if (!product) {
                throw new NotFoundException(`Product ${item.productId} not found`);
              }

              const quantity = item.quantity ?? 1;
              const selectedSize = item.size
                ? product.sizes.find((size) => size.name === item.size?.name)
                : undefined;
              if (item.size && !selectedSize) {
                throw new BadRequestException(
                  `Size ${item.size.name} is not available for ${product.name}`,
                );
              }
              const selectedToppings = (item.toppings ?? []).map((topping) => {
                const option = product.toppings.find(
                  (available) => available.name === topping.name,
                );
                if (!option) {
                  throw new BadRequestException(
                    `Topping ${topping.name} is not available for ${product.name}`,
                  );
                }
                return { name: option.name, price: option.price };
              });
              if (
                new Set(selectedToppings.map((topping) => topping.name)).size !==
                selectedToppings.length
              ) {
                throw new BadRequestException("A topping cannot be selected twice");
              }
              const sizePrice = selectedSize?.price ?? 0;
              const toppingsPrice = selectedToppings.reduce(
                (sum, topping) => sum + topping.price,
                0,
              );
              const unitPrice = product.price + sizePrice + toppingsPrice;
              return {
                productId: product.id,
                name: product.name,
                sizeName: selectedSize?.name ?? null,
                sizePrice,
                toppingsPrice,
                toppings: selectedToppings,
                unitPrice,
                quantity,
                lineTotal: unitPrice * quantity,
                stock: product.stock,
                stockVersion: product.stockVersion,
              };
            });

            const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
            const couponCode = dto.couponCode?.trim().toUpperCase();
            let coupon:
              | {
                  id: string;
                  code: string;
                  discountType: DiscountType;
                  value: number;
                  minimumOrderAmount: number;
                  maximumDiscount: number | null;
                  activeFrom: Date | null;
                  activeUntil: Date | null;
                }
              | null = null;
            let discountAmount = 0;

            if (couponCode) {
              coupon = await tx.coupon.findUnique({ where: { code: couponCode } });
              if (!coupon) {
                throw new BadRequestException("Coupon code is invalid");
              }
              const now = new Date();
              if (
                (coupon.activeFrom && coupon.activeFrom > now) ||
                (coupon.activeUntil && coupon.activeUntil < now) ||
                subtotal < coupon.minimumOrderAmount
              ) {
                throw new BadRequestException("Coupon is not valid for this order");
              }
              if (
                (coupon.discountType === DiscountType.PERCENTAGE &&
                  (coupon.value < 1 || coupon.value > 100)) ||
                (coupon.discountType === DiscountType.FIXED && coupon.value < 1)
              ) {
                throw new BadRequestException("Coupon configuration is invalid");
              }
              discountAmount =
                coupon.discountType === DiscountType.PERCENTAGE
                  ? Math.floor((subtotal * coupon.value) / 100)
                  : coupon.value;
              if (coupon.maximumDiscount !== null) {
                discountAmount = Math.min(discountAmount, coupon.maximumDiscount);
              }
              discountAmount = Math.min(discountAmount, subtotal);
            }

            for (const [productId, quantity] of quantities) {
              const product = productsById.get(productId);
              if (!product) {
                throw new NotFoundException(`Product ${productId} not found`);
              }
              const result = await tx.product.updateMany({
                where: {
                  id: productId,
                  stockVersion: product.stockVersion,
                  stock: { gte: quantity },
                },
                data: {
                  stock: { decrement: quantity },
                  stockVersion: { increment: 1 },
                },
              });
              if (result.count !== 1) {
                throw new ConflictException(
                  `Insufficient or concurrently changed inventory for ${product.name}`,
                );
              }
            }

            return tx.order.create({
              data: {
                userId: dto.userId,
                status: OrderStatus.PENDING,
                subtotal,
                discountAmount,
                total: subtotal - discountAmount,
                couponCode: coupon?.code,
                items: {
                  create: lines.map(
                    ({ stock, stockVersion, ...line }) => line,
                  ),
                },
              },
              include: { items: true },
            });
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2034" &&
          attempt < 2
        ) {
          continue;
        }
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          throw new ConflictException("Coupon has already been used by this user");
        }
        throw error;
      }
    }
    throw new ConflictException("Could not reserve inventory; please retry");
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true, payment: true },
    });
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }

  async findByUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true, payment: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async transition(id: string, nextStatus: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    if (!allowedTransitions[order.status]?.includes(nextStatus)) {
      throw new ConflictException(
        `Order cannot transition from ${order.status} to ${nextStatus}`,
      );
    }
    const result = await this.prisma.order.updateMany({
      where: { id, status: order.status },
      data: { status: nextStatus },
    });
    if (result.count !== 1) {
      throw new ConflictException("Order status changed concurrently");
    }
    return this.findOne(id);
  }
}
