# Base de Node.js versiÃ³n 18
FROM node:slim

# Cambiar a la carpeta de la aplicaciÃ³n
WORKDIR /app

# Instalar dependencias
COPY . .

RUN yarn

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicaciÃ³n
CMD ["yarn", "start"]