import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy toàn bộ món nước từ database kèm size và topping
  async findAll() {
    return this.prisma.product.findMany({
      include: {
        sizes: true,
        toppings: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Lấy chi tiết 1 món theo ID
  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        sizes: true,
        toppings: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với mã: ${id}`);
    }

    return product;
  }
}