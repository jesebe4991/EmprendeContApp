# Etapa de construcción
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY ./package*.json ./
RUN npm install

# Copiar el resto del código de la aplicación y crear la build
COPY . .
RUN npm run build

# Etapa de servidor estático
FROM nginx:alpine

# Copiar los archivos generados por Vite a NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de NGINX
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar NGINX
CMD ["nginx", "-g", "daemon off;"]
