// Usaremos las express

const app = require("./src/app.js");
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});

/*
En nuestro CLI Linux - Ubuntu (WSL) 
cd "/mnt/c/Users/mauuu/OneDrive/Escritorio/CODERHOUSE/[ 85485 Back-III CLASE ]/CLASE-01/CHILD-PROCESS"

* Para ejecutar el servidor con PM2, primero asegúrate de tener PM2 instalado globalmente:
* pm2 -v
* npm install pm2 -g
* Luego, puedes iniciar el servidor con PM2 usando el siguiente comando:
* -> pm2 start index.js --name miServidor
* ->  pm2 start index.js -i max --name miServidor

Esto iniciará el servidor en modo cluster, utilizando todos los núcleos de CPU disponibles.
Y mejorará el rendimiento en producción.

Los detenemos y eliminamos:
* pm2 stop miServidor
* pm2 delete miServidor

*/
