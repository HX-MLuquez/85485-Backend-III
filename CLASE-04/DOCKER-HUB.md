
# DOCKER HUB

## ¿Qué es Docker Hub?

Docker Hub es un **repositorio en línea** donde podés encontrar y compartir imágenes de Docker. Es como un "GitHub" para imágenes de Docker.

1. Nos logeamos en Docker Hub:

```bash
docker login
```

Previo podemos desloguearnos con:

```bash
docker logout
```

2. Creamos una imagen:

```bash
docker build -t usuario/nombre-imagen .
```

3. Creamos el tag de la versión que vamos a subir:

```bash
docker tag nombre-imagen usuario/nombre-imagen:version
```

Ejemplo con mi usuario:

```bash
docker tag nombre-imagen mauricio776/nombre-imagen:1.0.0
```

4. Subimos la imagen al Docker Hub:

```bash
docker push mauricio776/nombre-imagen:1.0.0
```

5. Verificamos que la imagen se haya subido correctamente:

```bash
docker images
```

6. Para descargar una imagen desde Docker Hub:

```bash
docker pull mauricio776/nombre-imagen:1.0.0
```