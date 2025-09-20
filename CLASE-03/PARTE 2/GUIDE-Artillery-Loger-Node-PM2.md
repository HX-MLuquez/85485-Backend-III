# Guía Práctica de Utilidades en Node.js: Manejo de Errores, Carga, PM2, NPM, Yarn y Artillery

Este documento resume herramientas, comandos y configuraciones útiles para el desarrollo backend con Node.js, incluyendo manejo de errores asincrónicos, uso de variables de entorno, pruebas de carga, administración de versiones con NVM, y gestión de paquetes con NPM y Yarn.

---

## 📦 Instalación y Manejo de Errores Asíncronos en Express

Para manejar errores de manera más limpia y centralizada en aplicaciones Express, puedes usar `express-async-errors`.

### Instalación

```bash
npm install express-async-errors
````

### Uso

Agrega al principio de tu archivo principal (por ejemplo, `index.js` o `app.js`):

```js
import "express-async-errors"; // con módulos ES
// o bien
require("express-async-errors"); // con CommonJS
```

> Esto permite que los errores lanzados en funciones `async` sean capturados automáticamente por el middleware de manejo de errores de Express.

### Tipos de Error Sugeridos

```js
export const TIPOS_ERROR = {
    TIPO_DE_DATOS: 400,              // Datos incorrectos enviados
    ARGUMENTOS_INVALIDOS: 400,       // Parámetros no válidos
    AUTENTICACION: 401,              // No autenticado
    AUTORIZACION: 403,               // Acceso denegado
    NOT_FOUND: 404,                  // Recurso no encontrado
    INTERNAL_SERVER_ERROR: 500       // Error interno del servidor
};
```

---

## Uso de Variables de Entorno

Puedes usar la opción `--env-file` para cargar variables de entorno desde un archivo `.env` al ejecutar tu aplicación.

```bash
node --env-file ./.env index.js
```

También puedes usar la opción `--watch` para recargar automáticamente:

```bash
node --watch --env-file ./.env index.js
```

---

## 📊 Pruebas de Carga con Artillery

### Instalar Artillery (si aún no lo tienes)

```bash
npm install -g artillery
```

Ver la versión instalada:

```bash
artillery --version
```

### Ejecutar una prueba rápida con nuestro ArtilleryQuick

Ejemplo de prueba de carga simple:
```bash
artillery quick -c 20 -n 40 http://localhost:3000/products/filter -o resultadoOperacionSimple.json
```


Ejemplo de prueba de carga compleja:
```bash
artillery quick -c 20 -n 40 http://localhost:3000/engineering/structural-analysis -o resultadoOperacionCompleja.json
```

* `-c 20` o `--count`: 20 clientes concurrentes.
* `-n 40` o `--num`: 40 peticiones en total.
* `-o` o `--output`: exporta el resultado a un archivo JSON.

#### Generar un informe visual
Artillery permite generar informes visuales a partir de los resultados de las pruebas de carga.

```bash
Ejemplo de generación de informe simple:
```bash
artillery report resultadoOperacionSimple.json -o informeOperacionSimple.html
```
Ejemplo de generación de informe complejo:
```bash
artillery report resultadoOperacionCompleja.json -o informeOperacionCompleja.html
```

### Ejecutar una prueba rápida con nuestro ArtilleryRun
```bash
config:
  plugins:
    metrics-by-endpoint: {}
  target: 'http://localhost:3000'
  phases:
    - duration: 20     <--- es el tiempo en que se ejecutan las pruebas con el FLOW
      arrivalRate: 5   <--- 5 peticiones por segundo
      el total es 100 veces cada FLOW
Nuestro FLOW de ejemplo ejecuta 3 peticiones -> el número final de peticiones 
según nuestro config.yml es de 300 peticiones
```

Ejemplo de carga:
```bash
artillery run config.yml --output resultadoRegisterLoginFlow.json
```
Ejemplo de generación de informe:
```bash
artillery report resultadoRegisterLoginFlow.json -o informeRegisterLoginFlow.html
```

---

## 🔁 NVM (Node Version Manager)

Permite cambiar entre versiones de Node.js fácilmente.

> Si estás usando `nvm`, recuerda usar siempre la versión correcta de Node para tu proyecto:

```bash
nvm use 20
```

---

## 📦 NPM: Gestión de Paquetes

### Publicar un paquete propio

```bash
npm login
npm version patch
npm publish
```

### Información útil

```bash
npm list express          # Muestra la versión instalada de express
npm list --depth=3        # Muestra dependencias anidadas
npm info nombre_paquete   # Muestra información desde el registro NPM
npm view nombre_paquete   # Similar a info, muestra versión y metadatos
```

📘 Documentación oficial:
[https://docs.npmjs.com/creating-and-publishing-scoped-public-packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

---

## 🧶 Yarn: Alternativa a NPM

### Activar y configurar

```bash
corepack enable
yarn init -2             # Inicializa un proyecto con Yarn v2+
yarn set version stable  # Usa la última versión estable
yarn install             # Instala dependencias
```

### Modo PnP vs node\_modules

Yarn por defecto utiliza PnP (Plug’n’Play), lo que elimina la carpeta `node_modules`.

* Si deseas usar `node_modules` como en NPM, agrega al archivo `.yarnrc.yml`:

```yaml
nodeLinker: node-modules
```

* Para volver a PnP:

```yaml
nodeLinker: pnp
```

### Nota:

En modo PnP, ejecuta tu app a través de los scripts configurados en `package.json` (`start`, `dev`, etc.).

---

## ⚙️ PM2: Gestión de Procesos en Producción

PM2 permite ejecutar y monitorear procesos Node.js en segundo plano, ideal para producción.

🔗 Sitio oficial:
[https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)

---

## ✅ Ejemplo Simple de Express con Manejo de Errores

```js
import express from 'express';
import "express-async-errors";

const app = express();

app.get('/', async (req, res) => {
    throw new Error('Error forzado');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});
```

---

## Recomendaciones Finales

* Usa `express-async-errors` para simplificar el manejo de errores en rutas async.
* Usa `artillery` para pruebas de rendimiento local.
* Define tus propios códigos de error en una constante global para facilitar mantenimiento.
* Utiliza variables de entorno (`.env`) para no hardcodear configuraciones sensibles.
* Considera Yarn 2+ si quieres evitar `node_modules` y mejorar rendimiento.
* Usa PM2 para mantener tus servicios Node.js en producción corriendo de forma confiable.

---


