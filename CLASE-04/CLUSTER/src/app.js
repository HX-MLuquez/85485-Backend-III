import express from "express";
import { router as testRouter } from "./routes/testRouter.js";

// Creamos la instancia de Express
const app = express();

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logWorkerId);

// Middleware de rutas
app.use("/", testRouter);

// Variable local al proceso para contar visitas (no se comparte entre workers)
let visitas = 0;

// Ruta raíz con contador de visitas (limitado a cada worker)
app.get("/", (req, res) => {
  visitas++;
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(`Visitas: ${visitas} | PID: ${process.pid}`);
});

// Exportamos la app configurada para usarla en otro archivo
export default app;

//* Middleware muestra en consola el PID del worker
function logWorkerId(req, res, next) {
  console.log(`Worker PID: ${process.pid}`);
  next();
}

/*
* Test de carga con Artillery
- npm start (desde teminal Linux) 
- artillery run config.yml --output resultadoBruteHash.json
- artillery report resultadoBruteHash.json -o informeRegistroBruteHash.html

* Clustering con Node.js 
Este test permite observar cómo se distribuye la carga entre los procesos hijos
El plugin metrics-by-endpoint te da métricas detalladas por ruta

* Cortar un worker (desde nueva terminal Linux)
ps aux | grep node
kill numberPID


* Info General

- `cluster.isPrimary`
Determina si el proceso actual es el **principal**, el cual se encarga de crear los **workers** (procesos hijos).

- `cluster.fork()`
Crea un nuevo proceso (worker) que ejecuta el mismo archivo. Cada uno tendrá su propia instancia del servidor.

- `cluster.on('disconnect')`
Detecta cuando un worker falla o se cierra, y permite regenerarlo automáticamente.

- `visitas++`
Este contador está en el espacio de memoria del **worker**, por lo tanto **no se comparte entre procesos**. 
Cada worker llevará su propio conteo.

---

* Consideraciones Importantes

* Si necesitás **compartir estado** (como el contador de visitas) entre workers, deberías usar Redis, 
  una base de datos, o comunicación IPC (inter-process communication).
* En entornos como Docker o DigitalOcean App Platform, **no siempre es necesario usar `cluster`**, 
  ya que el entorno ya escala procesos por contenedor/pod.
*/
