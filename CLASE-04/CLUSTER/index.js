import cluster from "cluster";
import os from "os";
import app from "./src/app.js"; // Importamos la app configurada

// Definimos el puerto que va a usar el servidor
const PORT = 3000;

// Obtenemos la cantidad de núcleos del CPU
// console.log("Núcleos disponibles:", os.cpus())
const numCPUs = os.cpus().length;
// console.log("Núcleos disponibles:", os.cpus());
// console.log("Núcleos disponibles length:", os.cpus().length);
//* Proceso principal (master / primary), generamos workers
//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝
// console.log("cluster -> ", cluster);
if (cluster.isPrimary) {
  console.log(
    `Proceso primario PID ${process.pid} | Generando ${numCPUs} workers...`
  );

  // cluster.fork(); // Genera un worker por cada núcleo
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();

  for (let index = 0; index < numCPUs; index++) {
    cluster.fork();
  }

  cluster.on("disconnect", (worker) => {
    console.log(
      `Worker PID ${worker.process.pid} (ID: ${worker.id}) desconectado. Creando nuevo worker...`
    );
    cluster.fork();
  });
} else {
  const server = app.listen(PORT, () => {
    console.log(
      `Worker (process) PID ${process.pid} (ID: ${cluster.worker.id}) escuchando en puerto http://localhost:${PORT}`
    );
  });
}

/*
* Para correr el proyecto en WSL2 UBUNTU
cd /mnt/c/Users/mauuu/OneDrive/Escritorio/CODERHOUSE/74610\ BACK-III\ MARTES\ 19-00/74610\ Back-III\ CLASE/CLASE-04
*/

// // Comentar para levantar desde Bloque Cluster
// const server = app.listen(PORT, () => {
//   console.log(`escuchando en puerto http://localhost:${PORT}`);
// });

/*

cluster {
}


clase plantilla -> {
   constructor {
   data1
   data2
   }

   metodo1{}
   metodo2{}


}

*/
