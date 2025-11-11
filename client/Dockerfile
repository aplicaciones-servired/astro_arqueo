# Etapa final (servidor SSR)
FROM node:20-alpine
WORKDIR /app

COPY --from=build /app /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

# Verificar que el archivo de entry existe
RUN ls -la ./dist/server/

CMD ["npm", "start"]