FROM oven/bun:alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000

# Copiamos lo mínimo para standalone + migraciones
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Necesario si vas a correr prisma migrate deploy en runtime
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Entrypoint para migraciones + arranque
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
# Importante: ejecutar el archivo con Bun (no "bun run")
ENTRYPOINT ["/entrypoint.sh"]
