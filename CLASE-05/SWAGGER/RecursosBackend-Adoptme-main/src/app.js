import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import dotenv from "dotenv";
dotenv.config();

const { PORT_DEV, MONGO_URL } = process.env;

const app = express();
const PORT = PORT_DEV || 3000;
const connection = mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(cookieParser());

//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝
//* Nuestra CONFIG debe estar antes de las routes
//* 1. Instalar dependencias
//-> npm i  swagger-ui-express  swagger-jsdoc

//* 2. Importar las dependencias
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

//* 3. Configurar Options

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Adoptme",
      version: "1.0.0",
      description: "API-REST Adoptme",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Desarrollo",
      },
      {
        url: "http://localhost:8080",
        description: "Producción",
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],

  //* Indicamos que vamos a implementar swagger en línea
  // apis: ["./src/**/*.js"], // o apis: ['./src/*.js'],  apis: ['./src/routes/**/*.js']
};

//* 4. Implementamos swagger

// Conectamos el server con el manifiesto .yaml
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Conección y creación de nuestra Interface de Documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------


app.use("/api/users", usersRouter);
/**
 * @swagger
 *   /api/users/:
 *     get:
 *       summary: Obtiene todos los usuarios disponibles en la aplicación.
 *       tags:
 *         - UsersDocInLinea
 *       responses:
 *         "200":
 *           description: La operación fue exitosa, se retorna un arreglo de los usuarios.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/UserDocInLine'
 *         "500":
 *           description: Error inesperado en el servidor, no se pudo manejar el proceso.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDocInLine:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado de MongoDB.
 *           example: "657872b1244ab4694ca2e659"
 *         first_name:
 *           type: string
 *           description: Nombre del usuario.
 *           example: Pepe
 *         last_name:
 *           type: string
 *           description: Apellido del usuario.
 *           example: Lopez
 *         email:
 *           type: string
 *           description: Email del usuario.
 *           example: pepe@gmail.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario (encriptada).
 *           example: $2398498$23749029409
 *         role:
 *           type: string
 *           description: Rol del usuario.
 *           example: admin
 *         pets:
 *           type: array
 *           description: Arreglo de mascotas del usuario.
 *           items:
 *             type: string
 *           example: ["gato"]
 */

app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

app.get("/", (req, res) => {
  const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin-top: 50px;
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                cursor: pointer;
            }
        </style>
    `;
  const html = `
    <DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API ABM Users</title>
    </head>
    <body>
        ${styles}
        <h1>Bienvenido a la API ABM Users</h1>
        <button onclick="window.location.href='/api-docs'">Ver Documentación API</button>
    </body>
    </html>
    `;
  res.status(200).send(html);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
