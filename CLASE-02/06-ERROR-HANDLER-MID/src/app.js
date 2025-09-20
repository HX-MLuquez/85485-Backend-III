const express = require("express");
const app = express();
const port = 3000;

//* Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------
//* Objeto Lista de Errores
// -------------------------
//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝

// function errorer(code) {
//   if(code===1) console.log(code);
//   if(code===2)  console.error(code);
//   return
// }

// -------------------------
//* CustomError Class <- Hemos creado una Clase Error personalizada
// -------------------------
class CustomError extends Error {
  //! ╔══════════════════════════════════════════════════╗
  //* ║═════════════════                ═════════════════║
  //* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
  //* ║═════════════════                ═════════════════║
  //! ╚══════════════════════════════════════════════════╝
}

// const errors = new CustomError("soy el mensaje", 404, {campo: "email", detalle: "Este campo es obligatorio y debe ser un string tipo email"})

app.get("/", (req, res) => {
  // errorer(ListErrors.INVALID_PARAM_ERROR)
  res.send("Hello World!");
});

// Route 01 - Error no controlado
app.get("/error-no-controlado", (req, res) => {
  throw new Error("Este es un error de nannannanana no controlado");
});

// Route 02 - Error Controlado
app.get("/error-custom", (req, res, next) => {
  return;
});

// Route 03 - Error Controlado
app.get("/error-custom-pro", (req, res, next) => {
  const { id, name } = req.query;

  const errores = [];
  if (!id) {
    errores.push({ campo: "id", detalle: "El parámetro 'id' es requerido" }); //* Cargamos la 'cause'
  } else if (isNaN(Number(id))) {
    errores.push({ campo: "id", detalle: "El 'id' debe ser un número" });
  }

  if (!name) {
    errores.push({
      campo: "name",
      detalle: "El parámetro 'name' es requerido",
    });
  } else if (typeof name !== "string" || name.trim().length < 2) {
    errores.push({
      campo: "name",
      detalle: "El 'name' debe ser un string de al menos 2 caracteres",
    });
  }

  //* En esta parte estamos atrapando los errores utilizando nuestra clase y retornando next(error) -> para que se active nuestro middelware de errorHandle
  if (errores.length > 0) {
    const error = new CustomError(
      "Parámetros inválidos en la consulta",
      ListErrors.INVALID_PARAM_ERROR,
      errores
    );
    return next(error);
  }

  res.status(200).json({
    status: "success",
    message: "Parámetros válidos",
    data: { id: Number(id), name },
  });
});

// -------------------------
//* Function errorHandle para nuestro Middelware
// -------------------------

// error {message: "holis", code: 2, cause:{}}
function errorHandle(error, req, res, next) {
  console.error("Error capturado por el middleware:");
  //! ╔══════════════════════════════════════════════════╗
  //* ║═════════════════                ═════════════════║
  //* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
  //* ║═════════════════                ═════════════════║
  //! ╚══════════════════════════════════════════════════╝
}

// -------------------------
//* Middelware de Error SIEMPRE deben venir al FINAL de TODO
// -------------------------
app.use(errorHandle);

/*
* En Express, los middlewares se ejecutan en el orden en que los definís. Por eso:
Los middlewares normales (como express.json(), cors, etc.) sí van al inicio.
Las rutas deben ir después de los middlewares generales.
El middleware de errores ((err, req, res, next) => {}) debe ir al final, porque solo 
se ejecuta si alguna ruta o middleware anterior llama a next(err) o lanza un error.

req -> { }

req.pepe = "ninini"

req.query -> { }
req.params -> { }
req.body -> { }

if tengo algún error ->  req.body.listErrors []
*/

module.exports = app;
