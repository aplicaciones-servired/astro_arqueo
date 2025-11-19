FROM node:20-alpine AS build
WORKDIR /app

# Recibir variables de entorno
ARG PUBLIC_URL_API
ARG PUBLIC_API_URL_LOGIN
ARG PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY

ENV PUBLIC_URL_API=$PUBLIC_URL_API
ENV PUBLIC_API_URL_LOGIN=$PUBLIC_API_URL_LOGIN
ENV PUBLIC_CLERK_PUBLISHABLE_KEY=$PUBLIC_CLERK_PUBLISHABLE_KEY
ENV CLERK_SECRET_KEY=$CLERK_SECRET_KEY

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
ENV NODE_ENV=production
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "4321"]
