# Etapa de producción (o dev estable)
FROM public.ecr.aws/docker/library/node:20-slim

# Para builds reproducibles y mejores stack traces
ENV NODE_ENV=production
ENV TZ=America/Argentina/Buenos_Aires

# Directorio de trabajo
WORKDIR /comidin

# 1) Instalar dependencias
COPY package*.json ./
# Si preferís dev dentro del contenedor, podés sacar --only=production
RUN npm ci --only=production

# 2) Copiar SOLO el código del backend (evitamos traer el front)
# Ajustá esta lista si tenés más carpetas del backend
COPY app.js ./app.js
COPY database ./database
COPY routes ./routes
COPY controllers ./controllers
COPY models ./models
COPY validators ./validators
COPY utils ./utils
COPY config ./config

# Puerto
EXPOSE 3000

# Comando
# - En producción: usar "start" (sin nodemon)
# - En testing local con el contenedor: podés usar "start:dev"
# CMD ["npm","run","start"]
CMD ["npm","run","start"]
