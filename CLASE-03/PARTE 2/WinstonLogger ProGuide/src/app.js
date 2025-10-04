import { fileURLToPath } from "url";
import { dirname } from "path";
import { middLogg } from "./config/logger.js";
import path from "path";
import express from "express";
import { engine } from "express-handlebars";

import { router as vistasRouter } from "./routes/views.router.js";
import { router as charactersRouter } from "./routes/characters.router.js";

const app = express();

// Resolver __dirname y __filename en ESModules
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename); // Exportar __dirname si lo necesitas en otras partes del proyecto
// console.log("------------>", __dirname);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Inyectamos nuestro Middelware middLogg para tener nuestros logger
app.use(middLogg);
app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/", vistasRouter);
app.use("/api/characters", charactersRouter);

export default app;
