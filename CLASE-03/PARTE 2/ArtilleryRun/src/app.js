import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fakerES_MX as faker } from "@faker-js/faker";
import { router as sessionsRouter } from "./routes/sessionsRouter.js";
import morgan from "morgan";
const logger = morgan("dev");
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cookieParser());

// Ruta principal con un html de estilo simple con bttn que lleva a /generate-data-user
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API TEST - FAKER - ARTILLERY</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <h1>API TEST - FAKER - ARTILLERY</h1>
    <p>Haz clic en el botón para generar un usuario falso:</p>
    <button onclick="window.location.href='/generate-data-user'">Generar usuario</button>
</body>
</html>
`;
app.get("/", (req, res) => {
  res.send(html);
});

// Rutas
app.use("/api/sessions", sessionsRouter);

// Ruta que genera un usuario falso
app.get("/generate-data-user", (req, res) => {
  const nombre = faker.person.firstName();
  const apellido = faker.person.lastName();
  const email = faker.internet.email({ firstName: nombre, lastName: apellido });
  const password = faker.internet.password({ length: 6, memorable: true });

  const usuario = { nombre, apellido, email, password };

  console.log(
    `Se generó el usuario ${nombre} ${apellido}, con email: ${email}`
  );
  res.status(200).json({ usuario });
});

// Función de conexión a la base de datos
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB online...!!!");
  } catch (error) {
    console.error(`Error de conexión a BD: ${error.message}`);
    process.exit(1);
  }
};

export default app;

/*
* Ejemplo de carga:
artillery run config.yml --output resultadoRegisterLoginFlow.json

* Ejemplo de generación de informe:
artillery report resultadoRegisterLoginFlow.json -o informeRegisterLoginFlow.html

*/
