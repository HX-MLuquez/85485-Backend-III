// Usaremos las librerías commander y el framework express
const app = require("./src/app.js");
const { config } = require("./src/config/config.js");

const { PORT, SECRET } = config;

//* EVENTOS del PROCESS
//* Testear un process.on para escuchar al cerrar el servidor
process.on("SIGINT", () => {
  console.log("Cerrando el servidor..."); // Este mensaje se verá al cerrar el servidor con Ctrl + C
  server.close(() => {
    console.log("Servidor cerrado");
    process.exit(0); // Finaliza el proceso actual de Node.js
  });
});

//* Testear un process.on para capturar errores de promesas no manejadas
// Capturar errores que no fueron atrapados
process.on("uncaughtException", (err) => {
  //* Comentamos y descomentamos para ver el error
  console.error("¡Ocurrió un error no controlado!", err.message);
  console.log("Pero no se cayó la aplicación");
  // Aquí de ser necesario podemos armar un informe y forzar el cierre del servidor
  // server.close(() => { process.exit(1); });
});

setTimeout(() => {
    console.log("Voy a causar un error...");
    nonExistentFunction(); // Esto lanza el error ya que la función no existe
    console.log("¿La app sigue viva?");
  }, 2000);


const server = app.listen(PORT, () => {
  console.log(PORT, SECRET);
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});
