// PROCESS CHILD
//* Proceso hijo que realiza un cálculo complejo

// ---
//! |-------------------|
//! | *** CODE AQUI *** |
//! |-------------------|
const { calculoComplejo } = require("./functionCompleja.js"); // Importa la función de cálculo complejo


//* Este es un process HIJO
//* process.on("message")  + process.send
process.on("message", (msg) => {
  console.log(`Proceso hijo (PID ${process.pid}) recibió: "${msg}"`);
  console.log("Comienza cálculo complejo");
  console.time("Duración del cálculo");

  const result = calculoComplejo();
  console.timeEnd("Duración del cálculo");
  process.send({ type: "resultado", result: Math.round(result) });
});
