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
// app.use(compression()); // por defecto con gzip
app.use(compression({ brotli: { enabled: true, zlib: { level: 11 } } }));


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
  const textoComprimido = zlib.gzipSync(texto, { level: 9 });
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Encoding", "gzip");
  res.status(200).send(textoComprimido);
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
  const textoComprimido = zlib.brotliCompressSync(texto);
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Encoding", "br");
  res.status(200).send(textoComprimido);
});

module.exports = app;

/*
10 mb -> 1,5 seg 
comprimo 0,2  0,7  0,2 descomprimo   1,1  
comprimo 0,4  0,5  0,4 descomprimo   1,3 seg

5 mb -> 0,75
comprimo 0,4  0,3  0,4 descomprimo   1 seg
comprimo 0,5  0,1  0,5 descomprimo   1,1 seg
comprimo 0,2  0,5  0,2 descomprimo   0,9  
*/

/*
COMPRIMIR

ZLIB (node native)   COMPRESSION (lib ext)

gzip || brotli

Niveles de comprimir 1 - 10
*/
