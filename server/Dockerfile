# Base de Node.js versiÃ³n 18
FROM node:18-alpine

# Cambiar a la carpeta de la aplicaciÃ³n
WORKDIR /app

# Copiar package.json y package-lock.json primero (para cachear capas)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --omit=dev

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicaciÃ³n
CMD ["node", "--env-file=.env", "./dist/index.js"]