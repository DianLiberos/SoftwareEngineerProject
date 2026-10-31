import { PrismaService } from "../prisma/prisma.service";
export declare class LoyaltyController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getLoyalty(id: string): Promise<{
        id: string;
        loyaltyPoints: number;
    }>;
}
