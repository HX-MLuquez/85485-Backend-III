import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import userModel from "./dao/models/User.js";
import petModel from "./dao/models/Pet.js";
import adoptionModel from "./dao/models/Adoption.js";

import dotenv from "dotenv";
dotenv.config();

const { PORT_SERVER, MONGO_URI } = process.env;

const app = express();
const PORT = PORT_SERVER || 8080;

const connection = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectados a nuestra DB");
  })
  .catch(() => {});

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

//* Route para crear usuarios, mascotas y adopciones en la base de datos
app.get("/api/seed", async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    const petCount = await petModel.countDocuments();

    if (userCount > 0 || petCount > 0) {
      return res.status(400).json({
        message:
          "Ya existen datos en la base. Seed no ejecutado para evitar duplicados.",
        users: userCount,
        pets: petCount,
      });
    }

    // 1. Crear usuarios
    const users = await userModel.insertMany([
      {
        first_name: "Juan",
        last_name: "Test1",
        email: "juan@test.com",
        password: "1234",
        role: "admin",
      },
      {
        first_name: "Maria",
        last_name: "Test2",
        email: "maria@test.com",
        password: "1234",
        role: "user",
      },
      {
        first_name: "Pedro",
        last_name: "Test3",
        email: "pedro@test.com",
        password: "1234",
        role: "user",
      },
    ]);

    // 2. Crear mascotas con sus respectivos dueños
    const pets = await petModel.insertMany([
      { name: "Firulais", specie: "Perro", owner: users[0]._id },
      { name: "Miau", specie: "Gato", owner: users[1]._id },
      { name: "Perrito", specie: "Perro", owner: users[2]._id },
      { name: "Gatito", specie: "Gato", owner: users[1]._id },
      { name: "Loro", specie: "Ave", owner: users[0]._id },
    ]);

    // 3. Crear adopciones
    const adoptions = await adoptionModel.insertMany([
      { owner: users[0]._id, pet: pets[0]._id },
      { owner: users[1]._id, pet: pets[1]._id },
    ]);

    // 4. Actualizar usuarios con sus mascotas
    const petMap = {};
    pets.forEach((pet) => {
      const ownerId = pet.owner.toString();
      if (!petMap[ownerId]) petMap[ownerId] = [];
      petMap[ownerId].push({ _id: pet._id });
    });

    // Actualizar solo cada usuario con sus propias mascotas
    await Promise.all(
      users.map((user) =>
        userModel.updateOne(
          { _id: user._id },
          { $set: { pets: petMap[user._id.toString()] || [] } }
        )
      )
    );

    res
      .status(201)
      .json({ message: "Seed completado", users, pets, adoptions });
  } catch (error) {
    console.error("Error al hacer seed:", error);
    res.status(500).json({ error: "Error al hacer seed" });
  }
});

//* Route raíz
app.get("/", (req, res) => {
  try {
    const styles = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #4CAF50;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 5px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #45a049;
        }
    `;
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Adoptme API</title>
        <style>${styles}</style>
        </head>
        <body>
            <h1>Adoptme API</h1>
            <p>Welcome to the Adoptme API. Use the buttons below to navigate:</p>
            <button onclick="location.href='/api/users'">Users</button>
            <button onclick="location.href='/api/pets'">Pets</button>
            <button onclick="location.href='/api/adoptions'">Adoptions</button>
            <button onclick="location.href='/api/sessions'">Sessions</button>
            <button onclick="location.href='/api/seed'">Seed Data</button>
        </body>
    </html>`;
    res.send(html);
  } catch (error) {
    console.error("Error al generar la documentación:", error);
    res.status(500).send("Error al generar la documentación");
  }
});

//* Route Error 404
app.use((req, res) => {
  const styles = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
        }

  `;
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 Not Found</title>
        <style>${styles}</style>
    </head>
    <body>
        <h1>404 Not Found</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <button onclick="location.href='/'">Volver a la página principal</button>
    </body>
    </html>
  `;
  res.status(404).send(html);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
