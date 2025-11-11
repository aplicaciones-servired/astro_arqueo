# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Etapa final (servidor SSR)
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app /app
ENV NODE_ENV=production

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
