import app from "./src/app.js";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});

//* Recreo de 10 min, volvemos a las 20:10 !!!
