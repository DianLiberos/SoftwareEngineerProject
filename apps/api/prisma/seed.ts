import {
  DiscountType,
  IngredientUnit,
  PrismaClient,
  Role,
} from "../src/generated/prisma/client";
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
    update: {
      name: "BrewLite Demo",
      email: "demo@brewlite.local",
      password: defaultPassword,
      role: Role.CUSTOMER,
    },
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

  const ingredients = [
    { id: "coffee", name: "Coffee", unit: IngredientUnit.GRAM, stockQuantity: 5000 },
    { id: "milk", name: "Milk", unit: IngredientUnit.MILLILITER, stockQuantity: 20000 },
    { id: "tea", name: "Tea", unit: IngredientUnit.GRAM, stockQuantity: 3000 },
    {
      id: "peach-tea",
      name: "Peach tea",
      unit: IngredientUnit.GRAM,
      stockQuantity: 5000,
    },
  ];

  for (const ingredient of ingredients) {
    await prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: { name: ingredient.name, unit: ingredient.unit },
      create: ingredient,
    });
  }
  const ingredientIds = new Map(ingredients.map(({ id, name }) => [name, id]));

  const products = [
    {
      id: "1",
      name: "Cà phê sữa",
      price: 35000,
      imageUrl: "/images/cafesua.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [],
      recipes: [
        { size: "M", ingredients: { Coffee: 18, Milk: 150 } },
        { size: "L", ingredients: { Coffee: 24, Milk: 200 } },
      ],
    },
    {
      id: "2",
      name: "Cà phê đen",
      price: 30000,
      imageUrl: "/images/cafeden.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [],
      recipes: [
        { size: "M", ingredients: { Coffee: 18 } },
        { size: "L", ingredients: { Coffee: 24 } },
      ],
    },
    {
      id: "3",
      name: "Trà sữa",
      price: 38000,
      imageUrl: "/images/trasua.png",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [
        { name: "Thạch", price: 8000 },
        { name: "Trân châu", price: 8000 },
      ],
      recipes: [
        { size: "M", ingredients: { Tea: 8, Milk: 150 } },
        { size: "L", ingredients: { Tea: 10, Milk: 200 } },
      ],
    },
    {
      id: "4",
      name: "Trà đào",
      price: 39000,
      imageUrl: "/images/tradao.jpeg",
      sizes: [
        { name: "M", price: 0 },
        { name: "L", price: 6000 },
      ],
      toppings: [{ name: "Miếng đào", price: 10000 }],
      recipes: [
        { size: "M", ingredients: { Tea: 8, "Peach tea": 20 } },
        { size: "L", ingredients: { Tea: 10, "Peach tea": 25 } },
      ],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    });

    await prisma.productRecipe.deleteMany({
      where: { productSize: { productId: product.id } },
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

    const savedSizes = await prisma.productSize.findMany({
      where: { productId: product.id },
      select: { id: true, name: true },
    });
    const sizeIds = new Map(savedSizes.map((size) => [size.name, size.id]));
    await prisma.productRecipe.createMany({
      data: product.recipes.flatMap(({ size, ingredients: recipe }) => {
        const productSizeId = sizeIds.get(size);
        if (!productSizeId) {
          throw new Error(`Missing ${size} size for ${product.name}`);
        }
        return Object.entries(recipe).map(([ingredientName, quantity]) => {
          const ingredientId = ingredientIds.get(ingredientName);
          if (!ingredientId) {
            throw new Error(`Unknown recipe ingredient: ${ingredientName}`);
          }
          return { productSizeId, ingredientId, quantity };
        });
      }),
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