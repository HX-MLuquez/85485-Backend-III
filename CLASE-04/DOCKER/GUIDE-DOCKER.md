# DOCKER

Para instalar vamos a:

- Descargar el instalador de Docker Desktop desde la página oficial de Docker.
  - https://www.docker.com/products/docker-desktop

Para ver lista de Catálogos de imágenes disponibles en Docker Hub:

- https://hub.docker.com/explore/

Desde la terminal de Linux:

```bash
docker --version
```

```bash
docker search <nombre_imagen>
```

## ¿Qué es realmente un contenedor?

Un contenedor ya incluye su propio sistema operativo (mínimo). Por ejemplo, la imagen node:20 está basada en Debian/Alpine, que ya es un Linux mínimo. Así que cada contenedor es "como" una mini-máquina con Linux, pero muy liviana.

---

---

## 🧾 ¿Qué es un `Dockerfile`?

Un `Dockerfile` es como una **receta de cocina** 🧑‍🍳 que le dice a Docker **cómo construir una imagen** paso a paso. Contiene instrucciones como:

```Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

Comandos:

- Crear una **IMAGEN** a partir del `Dockerfile`:

```bash
docker build -t app-hoy .
```

```bash
docker build -t mza-app-image .
```

Donde `-t` es para etiquetar la imagen y `.` indica que el Dockerfile está en el directorio actual.

- Listar imágenes:

```bash
docker images
```

- Iniciar un contenedor:

```bash
docker run -p 8080:3000 --name app-contenedor app-imagen
```

```bash
docker run -p 8080:3000 --name mza-app-container mza-app-image
```

El puerto '8080' es el puerto del host (donde se expone) y '3000' es el puerto interno del contenedor.

Si queremos antes de la `-p` agregamos `-d` es para ejecutarlo en segundo plano y `-p` es para mapear puertos (host:contenedor).

```bash
docker run -d -p 8080:3000 --name app-hoy-contenedor app-hoy
```

Probar en el navegador: `http://localhost:8080`

- Listar contenedores:

```bash
docker ps
```

Si aplicamos cambios en nuestro repositorio y queremos que se vean reflejados en el contenedor, debemos hacer lo siguiente:
¿Qué hacer para que el contenedor tome los cambios?

1. Volver a construir la imagen (rebuild)
   Si los archivos se copiaron dentro de la imagen en el Dockerfile (con COPY), tenés que:

- Reconstruir la imagen con:

```bash
docker build -t nombre-imagen .
```

- Parar y borrar el contenedor viejo (si está corriendo):

```bash
docker stop nombre-contenedor
docker rm nombre-contenedor
```

- Crear y correr un nuevo contenedor con la imagen actualizada:

```bash
docker run -d -p 8080:3000 --name nombre-contenedor nombre-imagen
```

- De necesitar eliminar una imagen:

```bash
docker rmi nombre-imagen
```

---

## Despliegue local automatizado (sin utilizar docker-compose)

- Creamos el archivo deploy.sh
- Lo configuramos
- Correr para dar permiso de ejecución

```bash
chmod +x deploy.sh
```

- Ejecutar el script

```bash
./deploy.sh
```

## 🧊 ¿Qué es una **imagen**?

Una **imagen** es el resultado de procesar ese `Dockerfile`. Es como un _molde congelado_ con el sistema de archivos completo: sistema operativo + dependencias + código.

- Ejemplo:

```bash
docker build -t mi-app .
```

---

## ¿Qué es un **contenedor**?

Un **contenedor** es una **instancia en ejecución** de una imagen. Podés tener múltiples contenedores corriendo desde la **misma imagen**.

- Ejemplo:

```bash
docker run -d --name contenedor1 mi-app
docker run -d --name contenedor2 mi-app
```

Ambos usarán la **misma imagen**, pero serán contenedores separados, cada uno con su propio proceso.

---

## Comparación rápida:

| Elemento     | Qué es                         | Ejemplo             |
| ------------ | ------------------------------ | ------------------- |
| `Dockerfile` | Receta para construir imágenes | `FROM node:20`      |
| Imagen       | Resultado del `Dockerfile`     | `mi-app:latest`     |
| Contenedor   | Ejecución de una imagen        | `docker run mi-app` |

---

---

## `-d` (detached mode)

Cuando usás `docker run` con la opción `-d` (detached mode), el contenedor se **ejecuta en segundo plano** (background). Esto significa que:

- El comando **no bloquea tu terminal**.
- Podés seguir usando la terminal para otras cosas mientras el contenedor corre.
- No ves en tiempo real el output (logs) del contenedor en la consola a menos que uses comandos como `docker logs`.

Sin `-d` (modo _foreground_):

- El contenedor corre **en primer plano** y el output (stdout/stderr) se muestra directamente en tu terminal.
- La terminal queda “ocupada” mientras el contenedor está corriendo.
- Para detener el contenedor, generalmente necesitás hacer Ctrl+C.

---

### Ventajas de usar `-d`:

- Permite correr múltiples contenedores sin bloquear la terminal.
- Es ideal para ambientes de producción o desarrollo donde querés que el contenedor funcione “silenciosamente”.
- Podés administrar y monitorear los contenedores por separado (usando `docker logs`, `docker exec`, etc.).

---

### En resumen:

| Opción | ¿Qué hace?             | ¿Ves logs en consola?               | ¿Terminal queda libre? |
| ------ | ---------------------- | ----------------------------------- | ---------------------- |
| sin -d | Corre en primer plano  | Sí                                  | No                     |
| con -d | Corre en segundo plano | No (a menos que uses `docker logs`) | Sí                     |

---
