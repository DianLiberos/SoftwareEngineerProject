import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy toàn bộ món nước từ database kèm size và topping
  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        sizes: {
          include: {
            recipe: { include: { ingredient: true } },
          },
        },
        toppings: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    return products.map((product) => this.withAvailableStock(product));
  }

  // Lấy chi tiết 1 món theo ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        sizes: {
          include: {
            recipe: { include: { ingredient: true } },
          },
        },
        toppings: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với mã: ${id}`);
    }

    return this.withAvailableStock(product);
  }

  private withAvailableStock<
    T extends {
      sizes: {
        recipe: {
          quantity: number;
          ingredient: { stockQuantity: number };
        }[];
      }[];
    },
  >(product: T) {
    const sizes = product.sizes.map((size) => {
      const availableQuantity =
        size.recipe.length === 0
          ? 0
          : Math.min(
              ...size.recipe.map((recipe) =>
                Math.floor(
                  recipe.ingredient.stockQuantity / recipe.quantity,
                ),
              ),
            );
      const { recipe: _recipe, ...sizeWithoutRecipe } = size;
      return { ...sizeWithoutRecipe, stock: availableQuantity };
    });

    return {
      ...product,
      sizes,
      stock: sizes.length ? Math.max(...sizes.map((size) => size.stock)) : 0,
    };
  }
}