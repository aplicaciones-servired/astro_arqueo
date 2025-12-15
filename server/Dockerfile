# =========================
# Etapa de build
# =========================
FROM node:20-slim AS build
WORKDIR /app

RUN corepack enable

# Copiar solo dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar código (SIN node_modules)
COPY . .

# =========================
# Runtime
# =========================
FROM node:20-slim
WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
