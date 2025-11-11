# Etapa de compilación
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa de ejecución
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env ./.env
RUN npm ci --omit=dev

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
