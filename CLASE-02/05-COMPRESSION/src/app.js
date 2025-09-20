const express = require("express");
const app = express();
const zlib = require("zlib"); // modulo nativo de node js

const compression = require("express-compression"); // es un Middelware

const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware compression (brotli) (compression())
//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Ruta 0 - Sin comprimir
app.get("/normal", (req, res) => {
  const texto =
    "Hola Mundo, he aquí la primera descripción, no había un solo ...".repeat(
      200_000
    ); // va a repetir esto 200.000 veces
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(texto);
});

// Ruta 1 - Comprimir con gzip1
app.get("/gzip1", (req, res) => {
  const texto =
    "Hola Mundo, he aquí la primera descripción, no había un solo ...".repeat(
      200_000
    );
  //! ╔══════════════════════════════════════════════════╗
  //* ║═════════════════                ═════════════════║
  //* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
  //* ║═════════════════                ═════════════════║
  //! ╚══════════════════════════════════════════════════╝
});

// Ruta 2 - Comprimir con zlib brotli
app.get("/brotli1", (req, res) => {
  const texto =
    "Hola Mundo, he aquí la primera descripción, no había un solo ...".repeat(
      200_000
    ); // va a repetir esto 400.000 veces
  //! ╔══════════════════════════════════════════════════╗
  //* ║═════════════════                ═════════════════║
  //* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
  //* ║═════════════════                ═════════════════║
  //! ╚══════════════════════════════════════════════════╝
});

module.exports = app;
