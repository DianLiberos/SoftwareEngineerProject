import { DiscountType, PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.user.upsert({
    where: { id: "user-demo-01" },
    update: {},
    create: {
      id: "user-demo-01",
      name: "BrewLite Demo",
      email: "demo@brewlite.local",
    },
  });

  const products = [
    {
      id: "1",
      name: "Cà phê sữa",
      price: 35000,
      stock: 20,
      sizes: [
        { name: "S", price: 0 },
        { name: "M", price: 5000 },
        { name: "L", price: 10000 },
      ],
      toppings: [
        { name: "Trân châu trắng", price: 10000 },
        { name: "Thạch đào", price: 10000 },
      ],
    },
    {
      id: "2",
      name: "Americano",
      price: 40000,
      stock: 15,
      sizes: [
        { name: "S", price: 0 },
        { name: "M", price: 5000 },
        { name: "L", price: 10000 },
      ],
      toppings: [{ name: "Thạch cà phê", price: 8000 }],
    },
    {
      id: "3",
      name: "Cappuccino",
      price: 45000,
      stock: 10,
      sizes: [
        { name: "S", price: 0 },
        { name: "M", price: 5000 },
        { name: "L", price: 10000 },
      ],
      toppings: [{ name: "Bột cacao", price: 5000 }],
    },
    {
      id: "4",
      name: "Trà đào",
      price: 39000,
      stock: 25,
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [{ name: "Miếng đào ngâm", price: 12000 }],
    },
  ];
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        stock: product.stock,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
      },
    });
    await prisma.productSize.deleteMany({ where: { productId: product.id } });
    await prisma.productTopping.deleteMany({ where: { productId: product.id } });
    await prisma.productSize.createMany({
      data: product.sizes.map((size) => ({ ...size, productId: product.id })),
    });
    await prisma.productTopping.createMany({
      data: product.toppings.map((topping) => ({
        ...topping,
        productId: product.id,
      })),
    });
  }

  await prisma.coupon.upsert({
    where: { code: "BREW10" },
    update: {},
    create: {
      code: "BREW10",
      discountType: DiscountType.PERCENTAGE,
      value: 10,
      maximumDiscount: 50000,
      minimumOrderAmount: 30000,
    },
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
