# Multi-stage Dockerfile for NestJS + Prisma 7 (apps/api)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions and Prisma configuration
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install dependencies including devDependencies for build
RUN npm ci

# Generate Prisma Client (provide dummy DATABASE_URL during build phase)
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate

# Copy source code and build NestJS
COPY . .
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

# Copy built application and required assets from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 3001

# Automatically synchronize database schema and seed data on startup before running server
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npx prisma db seed && npm run start:prod"]
