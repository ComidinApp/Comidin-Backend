#Etapa de produccion
FROM node:20

#Establecemos directorio de trabajo dentro del contenedor
WORKDIR /comidin

#Copiar packjage json y package lock json al directorio de trabajo
COPY package*.json ./

#Instalar dependencias
RUN npm install

#Copiar todo el codigo fuente al directorio de trabajo
COPY . .

#Exponemos puerto 3000
EXPOSE 3000

CMD ["npm","run","dev"]