import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import config from "./config/config.js";

const app = express();
const connection = mongoose.connect(config.mongo.URL);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*
CORS - IMPLEMENTACIÓN PROFESIONAL y DINÁMICA para el acceso desde distintos dominios
*/

// middleware / corsHandler.js;
const { URL_ACCESS_A, URL_ACCESS_B, URL_ACCESS_C } = process.env;

/**
 * Middleware para manejar CORS de forma controlada.
 * Permite únicamente los orígenes definidos en variables de entorno.
 */
function corsHandler(req, res, next) {
  const allowedOrigins = [URL_ACCESS_A, URL_ACCESS_B, URL_ACCESS_C].filter(
    Boolean
  );
  const requestOrigin = req.headers.origin;

  // Verificar si el origen está autorizado
  if (allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
  }

  // Configuración general de cabeceras permitidas
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Responder inmediatamente a solicitudes preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}
app.use(corsHandler);

//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------
//*---------------------------------------------------------------------------

app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

app.listen(8080, () => console.log(`Listening on PORT 8080`));
