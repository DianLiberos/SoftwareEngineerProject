ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'CANCELLED';
ALTER TYPE "OrderStatus" ADD VALUE IF NOT EXISTS 'PAYMENT_FAILED';

CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'BARISTA', 'ADMIN');

ALTER TABLE "User"
    ADD COLUMN "password" TEXT NOT NULL DEFAULT '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEY5k7mGvitW0HKK',
    ADD COLUMN "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

ALTER TABLE "Product" ADD COLUMN "imageUrl" TEXT;

CREATE TYPE "IngredientUnit" AS ENUM ('GRAM', 'MILLILITER');

CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "IngredientUnit" NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "stockVersion" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Ingredient_stockQuantity_check" CHECK ("stockQuantity" >= 0)
);

CREATE TABLE "ProductRecipe" (
    "id" TEXT NOT NULL,
    "productSizeId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ProductRecipe_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "ProductRecipe_quantity_check" CHECK ("quantity" > 0)
);

ALTER TABLE "Product" DROP COLUMN "stock",
DROP COLUMN "stockVersion";

ALTER TABLE "OrderItem" ADD COLUMN "ingredients" JSONB NOT NULL DEFAULT '[]';

CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
CREATE UNIQUE INDEX "ProductRecipe_productSizeId_ingredientId_key"
    ON "ProductRecipe"("productSizeId", "ingredientId");
CREATE INDEX "ProductRecipe_ingredientId_idx" ON "ProductRecipe"("ingredientId");

ALTER TABLE "ProductRecipe"
    ADD CONSTRAINT "ProductRecipe_productSizeId_fkey"
    FOREIGN KEY ("productSizeId") REFERENCES "ProductSize"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProductRecipe"
    ADD CONSTRAINT "ProductRecipe_ingredientId_fkey"
    FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
