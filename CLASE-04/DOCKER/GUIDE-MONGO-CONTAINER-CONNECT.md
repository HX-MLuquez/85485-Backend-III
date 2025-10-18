# 🐳 Conectar tu app Node.js a un contenedor MongoDB usando Docker Compose

## 🧩 ¿Qué es Docker Compose?

Es una herramienta que permite definir y correr múltiples contenedores (servicios) con una sola configuración (`docker-compose.yml`), haciendo que se comuniquen fácilmente entre sí.

---

## 🧱 Estructura del proyecto

Supongamos que tenés este proyecto Node.js:

```
/mi-proyecto
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── src/
│   └── app.js
```

---

## 📄 Paso 1: `Dockerfile` para tu app

Crea un archivo `Dockerfile` en la raíz del proyecto con el siguiente contenido:

```Dockerfile
# Usa una imagen de Node oficial
FROM node:20

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto en el contenedor
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "src/app.js"]
```

---

## 📄 Paso 2: `docker-compose.yml`

Ahora creás el archivo `docker-compose.yml`:

```yaml
version: "3.8"

services:
  mongo:
    image: mongo:6
    container_name: mongo-db
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    restart: always

  app:
    build: .
    container_name: mi-app-node
    ports:
      - "8080:3000"
    depends_on:
      - mongo
    environment:
      - MONGO_URL=mongodb://mongo:27017/logindb
    restart: always

volumes:
  mongo-data:
```

### 🔍 Explicación:

- **mongo**: servicio que levanta un contenedor MongoDB.

  - `mongo:6`: imagen oficial de MongoDB.
  - `27017:27017`: expone el puerto para que puedas conectarte desde fuera si lo necesitás.
  - `volumes`: guarda datos persistentes.

- **app**: tu aplicación Node.js.

  - `build: .`: construye desde tu `Dockerfile`.
  - `depends_on`: asegura que MongoDB arranque antes que la app.
  - `MONGO_URL`: define la URL de conexión a MongoDB usando el **nombre del servicio `mongo`** como host.

- **volumes**: define un volumen persistente llamado `mongo-data` para guardar datos de MongoDB entre reinicios.

---

## 📄 Paso 3: Uso de `MONGO_URL` en tu aplicación

En tu `app.js`, usá `process.env.MONGO_URL`:

```js
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a BD:", err));

const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server escuchando en http://localhost:3000");
});
```

---

## 🚀 Paso 4: Levantar los contenedores

Desde la raíz del proyecto:

```bash
docker-compose up --build
```

Esto:

- Construye tu app.
- Levanta MongoDB y tu app.
- Conecta ambos contenedores internamente.

---

## ✅ Verificación

1. Entrá a tu contenedor:

   ```bash
   docker exec -it mi-app-node bash
   ```

2. Dentro del contenedor, podés probar:

   ```bash
   ping mongo
   ```

   Debería responder: significa que tu app **sí ve a MongoDB como `mongo`**.

---

## 🧼 Para detener todo

```bash
docker-compose down
```

---

## 📦 Bonus: acceder a MongoDB con Compass

Si querés usar MongoDB Compass desde tu PC:

- Host: `localhost`
- Puerto: `27017`
- DB: `logindb`

Ya que expusiste el puerto en el host.

---

## **IMPORTANTE**

### LOCAL

- POST http://localhost:3000/api/sessions/registro

```
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }
```

- POST http://localhost:3000/api/sessions/login

```
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }
```

---

### DOCKERIZADO

- Para las pruebas con los contenedores de la APP y de MONGODB en docker
  debo usar 8080 que es el puerto donde exponemos la APP ->

```
 ports:
      - "8080:3000" en el docker-compose.yml
o cuando corremos -> docker run -d -p 8080:3000 --name nombre-contenedor nombre-imagen
```

- POST http://localhost:8080/api/sessions/registro

```
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }
```

- POST http://localhost:8080/api/sessions/login

```
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }
```

---

## MongoDB COMPASS

Para conectar a la db del contenedor posiblemente debemos:

- > net stop MongoDB

Detener el servicio de MongoDB, cerrar Compass y volver a abrirlo
y volver a conectar con mongodb://localhost:27017/

Es el mismo puerto que usamos para conectarnos cuando levantamos localmente
O de no estar detenido lo iniciamos con el comando

- > net start MongoDB
