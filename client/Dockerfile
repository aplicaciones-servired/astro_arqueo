# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# 👇 Asegura que .env entre al build (porque Astro usa variables PUBLIC_ en build-time)
COPY .env .env

COPY . .
RUN npm run build

# Etapa final (SSR)
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app /app
ENV NODE_ENV=production

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]
