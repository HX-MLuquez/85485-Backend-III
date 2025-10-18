# 1. Especifica la imagen base que se usará (Node.js v20.11.0)
FROM node:20.11.0
# Usa una imagen oficial de Node.js con la versión 20.11.0 ya instalada.
# Esto incluye un sistema operativo (Linux) + Node.js preinstalado.
# 2. Define el directorio de trabajo dentro del contenedor
WORKDIR /app
# Crea (si no existe) y se mueve al directorio `/app` dentro del contenedor.
# Todas las instrucciones siguientes ocurrirán desde esta carpeta.
# 3. Copia los archivos de dependencias (package.json y package-lock.json si existe)
COPY package*.json ./
# Copia los archivos de configuración de dependencias desde tu máquina local
# al contenedor. El * incluye tanto `package.json` como `package-lock.json`.

# 4. Instala las dependencias definidas en package.json
RUN npm install
# Ejecuta `npm install` dentro del contenedor para instalar todas las
# dependencias de tu proyecto (en `/app/node_modules`).

# 5. Copia el código fuente de la aplicación al contenedor
COPY ./src ./src
# COPY <origen> <destino> Y COPY . . indica raiz del origen y raiz del destino
# Copia todo el contenido de la carpeta `src` desde tu máquina al contenedor.
# Esto excluye lo que esté definido en el `.dockerignore`.


# 6. Expone el puerto 3000 (generalmente se usa el 9090)
EXPOSE 3000
# Informa a Docker que el contenedor usará el puerto 3000 para escuchar.
# (Nota: esto no hace el binding real, sólo documenta la intención).
# Recordemos que tendremos un puerto interno (3000) y un puerto externo (puerto del host).
# El puerto interno sirve para la comunicación entre contenedores y el puerto externo es el que se expone al host.
# El puerto de EXPOSE debe ser el mismo que el del app.listen(...) en nuestro caso 3000
# El mapeo -p host:contenedor debe apuntar al puerto expuesto y escuchado

# 7. Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]
# Indica el comando que se ejecutará al iniciar el contenedor.
# Esto debe estar definido en tu `package.json` (script `"start"`).

# Al hacer build, dentro del contenedor tendrás:
# /app
#   |- src/
#   |- package.json
#   |- README.md


# docker build -t app-commerce-imagen-b .
# docker run -d -p 8080:3000 --name app-commerce-contenedor app-commerce-imagen