# Utilizar una imagen de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY ./package*.json ./
RUN npm install

# Copiar todo el código de la aplicación
COPY . .

# Exponer el puerto en el que escucha la app (usualmente 3000)
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]
