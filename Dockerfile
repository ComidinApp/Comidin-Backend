# Etapa única (producción / staging)
FROM public.ecr.aws/docker/library/node:20-slim

ENV NODE_ENV=production
ENV TZ=America/Argentina/Buenos_Aires

# Directorio de trabajo
WORKDIR /comidin

# 1) Instalar dependencias a partir de package.json / package-lock.json
COPY package*.json ./
# Si necesitás devDependencies en runtime, cambiá a: RUN npm ci
RUN npm ci --only=production

# 2) Copiar SOLO el código del backend (vive dentro de src/)
#    Ajustá si tenés otras carpetas necesarias dentro de src (p.ej. src/config, src/utils, etc.)
COPY src ./src

# 3) Exponer puerto
EXPOSE 3000

# 4) Comando de arranque
#    En contenedores se recomienda no usar nodemon; para dev local, corré fuera del contenedor o crea otro Dockerfile.dev
CMD ["node", "src/app.js"]
