#!/bin/bash

echo "Destruyendo contenedor anterior..."
docker compose down

echo "Construyendo imagen..."
docker compose build

echo "Levantando contenedor..."
docker compose up -d

echo "Aplicación corriendo en http://localhost:8080"

# Correr script:
# chmod +x docker-deploy.sh
# ./docker-deploy.sh