# Proyecto: Middleware de Logger con Winston

Este proyecto demuestra cómo implementar un **middleware de logging personalizado usando Winston** en una API REST construida con Node.js y Express.

## 📦 Dependencias principales

- **express** – Framework para construir APIs.
- **winston** – Biblioteca robusta de logging.
- **express-handlebars** – Motor de plantillas (opcional si tenés vistas).

---

## 📁 Estructura del Proyecto

```

src/
├── config/
│   └── config.js         # Configuración de entorno (modo, puerto, etc.)
│   └── logger.js         # Configuración central del logger y middleware
├── routes/
│   └── characters.router.js # Rutas para manejar personajes
│   └── views.router.js      # Rutas de vistas
├── logs/
│   └── error.log         # Archivo donde se registran los errores graves
├── views/                # Vistas con Handlebars
├── etc ...
└── app.js                # Inicialización de la app
.env                      # Variables de entorno

````

---

## ⚙️ Configuración de Entorno

En el archivo `.env`:

```env
PORT=8080
MODE=DEV
````

En `config.js`, se cargan estas variables para uso global:

```js
process.loadEnvFile('./.env');

export const config = {
  PORT: process.env.PORT || 3000,
  MODE: process.env.MODE || 'DEV',
};
```

---

## ¿Cómo funciona el logger?

* Se definen **niveles personalizados**: `grave`, `warn`, `info`, `leve`.
* Los errores graves se escriben en `src/logs/error.log`.
* Los mensajes informativos y advertencias solo aparecen en consola si el entorno (`MODE`) es `DEV`.
* El middleware `middLogg` inyecta el logger en cada request para ser usado como `req.logger`.

---

## ✅ Uso del logger en controladores o rutas

```js
req.logger.grave("Ocurrió un error grave");
req.logger.warn("Advertencia");
req.logger.info("Información general");
req.logger.leve("Mensaje de depuración");
```

---

## Middleware de logger

Este middleware se agrega a la app Express y permite que el logger esté disponible como `req.logger` en cada endpoint:

```js
import { middLogg } from "./config/logger.js";
app.use(middLogg);
```

---

## Pruebas con Postman

### 1. Crear personaje válido:

```
POST http://localhost:8080/api/characters
Content-Type: application/json

{
  "name": "Hancito",
  "homeworld": "Lejisimo",
  "species": "un mix de varios"
}
```

🟢 Resultado esperado: personaje creado, log `info` o `leve` en consola.

---

### 2. Provocar error (falta `name`):

```
POST http://localhost:8080/api/characters
Content-Type: application/json

{
  "homeworld": "mamamia",
  "species": "otro mix de varios"
}
```

🔴 Resultado esperado: log en archivo `error.log` con nivel `grave`.

---

### 3. Consultar personajes:

```
GET http://localhost:8080/api/characters
```

🟢 Resultado esperado: listado de personajes, log `info` o `leve`.

---

## 📄 Logs

* Los errores graves (`grave`) se almacenan en:

  ```
  src/logs/error.log
  ```

* Antes de testear, podés **vaciar el archivo `error.log`** para revisar sólo los logs actuales.

---

## Recomendaciones para pruebas

* Cambiá el valor de `MODE` a `PROD` en `.env` para deshabilitar la consola.
* Verificá que se registre correctamente el log en el archivo con errores intencionales.
* Si usás rutas protegidas o servicios externos, asegurate de capturar errores con try/catch.

---

## Limpieza de `error.log`

Antes de comenzar las pruebas:

1. Abrí `src/logs/error.log`
2. Eliminá todo el contenido (dejalo vacío)
3. Guardá y ejecutá los endpoints desde Postman

---

## 📌 Notas Finales

* Este proyecto implementa un logger escalable y profesional, útil tanto para entornos de desarrollo como de producción.
* Se recomienda expandir el logger para registrar también accesos, tiempos de respuesta o datos de usuarios autenticados si se necesita trazabilidad avanzada.

---

👨‍💻 *Desarrollado con fines educativos para la materia de Backend de Coderhouse.*

