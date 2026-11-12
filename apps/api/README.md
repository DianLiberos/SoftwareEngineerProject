## Run locally

`docker-compose up -d postgres` để chạy postgres qua docker
từ backend directory `backend/`:

npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run start:dev

With Prisma 7, the PostgreSQL connection URL is configured in
`prisma.config.ts`, not `schema.prisma`. The API uses Prisma's PostgreSQL
driver adapter, and the Prisma Client is generated automatically by the build
and start scripts.

The seed creates demo user `user-demo-01`, four menu products, ingredient
inventory, product-size recipes, and the `BREW10` coupon. Product stock is
derived from its size recipes; ingredient stock and prices in the database are
authoritative.

Inventory is tracked in whole grams or milliliters. Seed recipes use estimated
per-size quantities (for example, 18 g coffee for a medium coffee and 150 ml
milk for a medium milk coffee); replace these estimates with your actual recipes
and starting ingredient quantities before production. Orders reserve recipe
ingredients atomically, and cancellations restore the exact ingredient usage
stored on each order item.

## Endpoints

- `POST /orders` — body: `{ "userId": "...", "items": [{ "productId": "1", "quantity": 2 }], "couponCode": "BREW10" }` (`couponCode` optional)
- `GET /orders/:id` — retrieve an order with its items and payment
- `PATCH /orders/:id/status` — body: `{ "status": "PREPARING" | "READY" | "COMPLETED" }`; paid orders can advance only one step at a time
- `POST /payments` — requires `Idempotency-Key` header; body: `{ "orderId": "...", "method": "WALLET" | "BANK_CARD" }`
- `GET /users/:id/loyalty` — retrieve loyalty points
