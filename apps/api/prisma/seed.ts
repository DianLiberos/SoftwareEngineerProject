import { DiscountType, PrismaClient, Role } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const defaultPassword = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { id: "user-demo-01" },
    update: {},
    create: {
      id: "user-demo-01",
      name: "BrewLite Demo",
      email: "demo@brewlite.local",
      password: defaultPassword,
      role: Role.CUSTOMER,
    },
  });

  await prisma.user.upsert({
    where: { id: "user-barista-01" },
    update: {
      name: "Barista Quầy 1",
      email: "barista@brewlite.local",
      role: Role.BARISTA,
      password: defaultPassword,
    },
    create: {
      id: "user-barista-01",
      name: "Barista Quầy 1",
      email: "barista@brewlite.local",
      role: Role.BARISTA,
      password: defaultPassword,
    },
  });

  const products = [
    {
      id: "1",
      name: "Cà phê sữa",
      price: 35000,
      stock: 20,
      imageUrl: "/images/cafesua.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [],
    },
    {
      id: "2",
      name: "Cà phê đen",
      price: 30000,
      stock: 20,
      imageUrl: "/images/cafeden.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [],
    },
    {
      id: "3",
      name: "Trà sữa",
      price: 38000,
      stock: 20,
      imageUrl: "/images/trasua.png",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [
        { name: "Thạch", price: 8000 },
        { name: "Trân châu", price: 8000 },
      ],
    },
    {
      id: "4",
      name: "Trà đào",
      price: 39000,
      stock: 25,
      imageUrl: "/images/tradao.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [{ name: "Miếng đào", price: 10000 }],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl,
      },
    });

    await prisma.productSize.deleteMany({ where: { productId: product.id } });
    await prisma.productTopping.deleteMany({ where: { productId: product.id } });

    await prisma.productSize.createMany({
      data: product.sizes.map((size) => ({ ...size, productId: product.id })),
    });

    if (product.toppings.length > 0) {
      await prisma.productTopping.createMany({
        data: product.toppings.map((topping) => ({
          ...topping,
          productId: product.id,
        })),
      });
    }
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