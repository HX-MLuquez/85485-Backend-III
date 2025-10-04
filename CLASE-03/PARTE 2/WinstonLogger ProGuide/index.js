import app from "./src/app.js";
import { logger } from "./src/config/logger.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, (req) => {
  // console.log(`Server escuchando en puerto ${PORT}`);
  //* En mode = PROD este logger no se ejecuta, no lo vamos a ver en consola
  //* solo quedarán registrados los errores de level grave en el archivo error.log
  logger.info(`Server escuchando en puerto http://localhost:${PORT}`);
});

/*
En este caso debemos importar el logger desde el archivo de configuración, ya que no 
podemos acceder desde el req directamente desde porque en ese contexto no existe req 
(no es una petición HTTP).
*/


