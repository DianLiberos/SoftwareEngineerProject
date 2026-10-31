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

The seed creates demo user `user-demo-01`, four menu products, and the `BREW10` coupon. Database stock and prices are authoritative; order creation accepts product IDs and quantities,
not client-submitted prices.

## Endpoints

- `POST /orders` — body: `{ "userId": "...", "items": [{ "productId": "1", "quantity": 2 }], "couponCode": "BREW10" }` (`couponCode` optional)
- `GET /orders/:id` — retrieve an order with its items and payment
- `PATCH /orders/:id/status` — body: `{ "status": "PREPARING" | "READY" | "COMPLETED" }`; paid orders can advance only one step at a time
- `POST /payments` — requires `Idempotency-Key` header; body: `{ "orderId": "...", "method": "WALLET" | "BANK_CARD" }`
- `GET /users/:id/loyalty` — retrieve loyalty points
