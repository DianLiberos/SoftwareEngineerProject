import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class ValidateCouponDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber()
  @Min(0)
  orderAmount!: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
