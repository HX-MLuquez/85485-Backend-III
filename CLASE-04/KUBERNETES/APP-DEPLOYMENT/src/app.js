import express from "express";
import { router as sessionsRouter } from "./routes/sessionsRouter.js";
import { fakerES_MX as faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { config } from "./config/config.js";

const { PORT, MONGO_URI } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/sessions", sessionsRouter);

const styles = `body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {

            background-color: #0056b3;
        }`;
const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker</title>
    <style>
        ${styles}
    </style>
</head>
<body>
    <div class="container">
        <h1>Bienvenido a la API - Docker Container</h1>
        <p>Esta es una API de ejemplo para demostrar el uso de Docker.</p>
        <a href="/usuario" class="button">Ir a Usuario</a>
    </div>
</body>
</html>
`;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(html);
});

app.get("/usuario", (req, res) => {
  let nombre = faker.person.firstName();
  let apellido = faker.person.lastName();
  let email = faker.internet.email({ firstName: nombre, lastName: apellido });
  let password = faker.internet.password({ length: 6, memorable: true });

  let usuario = { nombre, apellido, email, password };
  console.log(
    `Se generó el usuario ${nombre} ${apellido}, con email: ${email}`
  );

  const userHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuario</title>
    <style>
        ${styles}
    </style>
</head>
<body>
    <div class="container">
        <h1>Usuario Generado</h1>
        <p><strong>Nombre:</strong> ${usuario.nombre}</p>
        <p><strong>Apellido:</strong> ${usuario.apellido}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
        <p><strong>Password:</strong> ${usuario.password}</p>
        <a href="/" class="button">Volver al Inicio</a>
    </div>
</body>
</html>
`;
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(userHtml);
});

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});
// const MONGO_URI = "mongodb://localhost:27017/logindb?directConnection=true";
//* directConnection=true es para evitar que el cliente busque un nodo primario en el cluster, ya que no existe
//* y se conecta directamente al nodo que le indiques en la URI

console.log(`Conectando a la BD ${MONGO_URI}...!!!`);
try {
  await mongoose.connect(MONGO_URI);
  //* Mongo como nuevo contenedor
  // No usar localhost dentro del contenedor. Debe ser mongo (el nombre del servicio)
  //* mongoose.connect("mongodb://mongo:27017/logindb")
  // Pero con agregar (o editar) la variable de entorno MONGO_URI en el docker-compose.yml listo
  console.log("DB online...!!!");
} catch (error) {
  console.log(`Error de conexión a BD: ${error.message}`);
}

/*
* LOCAL
* POST http://localhost:3000/api/sessions/registro
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }

* POST http://localhost:3000/api/sessions/login
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }

------------------------------------------------------------------
* DOCKERIZADO
* Para las pruebas con los contenedores de la APP y de MONGODB en docker
debo usar 8080 que es el puerto donde exponemos la APP -> 
 ports:
      - "8080:3000" en el docker-compose.yml 
o cuando corremos -> docker run -d -p 8080:3000 --name nombre-contenedor nombre-imagen
* POST http://localhost:8080/api/sessions/registro
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }

* POST http://localhost:8080/api/sessions/login
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }


----------------------------------------------------------------
* MongoDB COMPASS
Para conectar a la db del contenedor posiblemente debemos:
* > net stop MongoDB
Detener el servicio de MongoDB, cerrar Compass y volver a abrirlo
y volver a conectar con mongodb://localhost:27017/ 
Es el mismo puerto que usamos para conectarnos cuando levantamos localmente 
O de no estar detenido lo iniciamos con el comando
* > net start MongoDB
*/
