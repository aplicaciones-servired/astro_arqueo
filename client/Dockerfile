FROM node:20-alpine AS build
WORKDIR /app

# 👉 Recibir variables del build
ARG PUBLIC_URL_API
ARG PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

# 👉 Exponerlas dentro del build
ENV PUBLIC_URL_API=$PUBLIC_URL_API
ENV PUBLIC_CLERK_PUBLISHABLE_KEY=$PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# 👉 Astro lee las PUBLIC_*
RUN npm run build

# --- Runtime ---
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]
