const express = require("express");
const app = express();
const { config } = require("./config/config.js");

const { PORT, SECRET } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* ROUTE principal con un bttn que lleva a la ruta /env
app.get("/", (req, res) => {
  res.status(200).send(`
        <h1>Bienvenido a la ruta principal</h1>
        <button onclick="window.location.href='/env'">Ver variables de entorno</button>
    `);
});
//* Route que muestra los valores de las variables de entorno
app.get("/env", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    PORT: PORT,
    SECRET: SECRET,
  });
});

module.exports = app;
