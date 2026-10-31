import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("users")
export class LoyaltyController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(":id/loyalty")
  async getLoyalty(@Param("id") id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, loyaltyPoints: true },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
