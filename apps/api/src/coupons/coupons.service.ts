import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DiscountType } from "../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { ValidateCouponDto } from "./dto/validate-coupon.dto";

@Injectable()
export class CouponsService {
  constructor(private readonly prisma: PrismaService) {}

  async validateCoupon(dto: ValidateCouponDto) {
    const code = dto.code.trim().toUpperCase();
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      throw new NotFoundException(`Mã ưu đãi "${code}" không tồn tại trong hệ thống`);
    }

    const now = new Date();
    if (coupon.activeFrom && coupon.activeFrom > now) {
      throw new BadRequestException(`Mã ưu đãi "${code}" chưa đến thời gian áp dụng`);
    }

    if (coupon.activeUntil && coupon.activeUntil < now) {
      throw new BadRequestException(`Mã ưu đãi "${code}" đã hết hạn sử dụng`);
    }

    if (dto.orderAmount < coupon.minimumOrderAmount) {
      throw new BadRequestException(
        `Đơn hàng cần đạt tối thiểu ${coupon.minimumOrderAmount.toLocaleString(
          "vi-VN"
        )} đ để áp dụng mã này`
      );
    }

    if (dto.userId) {
      const redemption = await this.prisma.couponRedemption.findUnique({
        where: {
          couponId_userId: { couponId: coupon.id, userId: dto.userId },
        },
      });

      if (redemption) {
        throw new BadRequestException(
          `Bạn đã sử dụng mã ưu đãi "${code}" cho tài khoản này trước đây rồi`
        );
      }
    }

    let discountAmount = 0;
    if (coupon.discountType === DiscountType.PERCENTAGE) {
      discountAmount = Math.floor((dto.orderAmount * coupon.value) / 100);
      if (coupon.maximumDiscount !== null) {
        discountAmount = Math.min(discountAmount, coupon.maximumDiscount);
      }
    } else {
      discountAmount = coupon.value;
    }

    discountAmount = Math.min(discountAmount, dto.orderAmount);
    const finalTotal = Math.max(0, dto.orderAmount - discountAmount);

    return {
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value,
      discountAmount,
      finalTotal,
      message:
        coupon.discountType === DiscountType.PERCENTAGE
          ? `Áp dụng thành công! Giảm ${coupon.value}% (-${discountAmount.toLocaleString(
              "vi-VN"
            )} đ)`
          : `Áp dụng thành công! Giảm -${discountAmount.toLocaleString("vi-VN")} đ`,
    };
  }
}
