# Multi-stage Dockerfile for Next.js 16 (apps/web)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Pass backend URL at build time for client bundle embedding
ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=production

# Build optimized production bundle
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy built artifacts and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]
