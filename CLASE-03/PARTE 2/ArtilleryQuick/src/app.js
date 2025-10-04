import express from "express";
import { router as testRouter } from "./routes/testRouter.js";
const PORT = 3000;

// Middleware de loger de las respuestas
import morgan from "morgan";
const logger = morgan("dev");

const app = express();

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", (req, res) => {
    res.send("<h1>API para pruebas de Artillery</h1>");
});

app.use("/", testRouter);

/*
* Ejemplo de prueba de carga simple:
artillery quick -c 20 -n 40 http://localhost:3000/products/filter -o resultadoOperacionSimple.json

* Ejemplo de generación de informe simple:
artillery report resultadoOperacionSimple.json -o informeOperacionSimple.html

* Ejemplo de prueba de carga compleja:
artillery quick -c 20 -n 40 http://localhost:3000/engineering/structural-analysis -o resultadoOperacionCompleja.json

* Ejemplo de generación de informe compleja:
artillery report resultadoOperacionCompleja.json -o informeOperacionCompleja.html

*/

export default app;


