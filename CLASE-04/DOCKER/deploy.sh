#!/bin/bash

# Variables
IMAGE_NAME=nombre-imagen
CONTAINER_NAME=nombre-contenedor
HOST_PORT=8080
CONTAINER_PORT=3000  # este debe coincidir con el app.listen(...)
# EXPOSE 9090 dentro de nuestro Dockerfile es solo informativo para Docker, no define el puerto real de tu app

# echo "Haciendo git pull para actualizar el código local..." (opcional)
# git pull

echo "Deteniendo y eliminando contenedor anterior (si existe)..."
docker stop $CONTAINER_NAME 2>/dev/null
docker rm $CONTAINER_NAME 2>/dev/null

echo "Construyendo imagen Docker: $IMAGE_NAME ..."
docker build -t $IMAGE_NAME .

echo "Iniciando nuevo contenedor: $CONTAINER_NAME ..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $HOST_PORT:$CONTAINER_PORT \
  $IMAGE_NAME

echo "Despliegue finalizado en http://localhost:$HOST_PORT"


# Correr para dar permiso de ejecución
# chmod +x deploy.sh

# Ejecutar el script
# ./deploy.sh

# Para eliminar imagenes y contenedores no utilizados (opcional)

