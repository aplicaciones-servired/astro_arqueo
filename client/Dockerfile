# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build  # Esto ejecuta "astro build" según tu package.json

# Etapa final (servidor SSR)
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app /app
ENV NODE_ENV=production

EXPOSE 4321

# Comando directo con parámetros explícitos
CMD ["node", "./dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]