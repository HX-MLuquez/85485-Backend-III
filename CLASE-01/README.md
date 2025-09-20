
# PROCESS - OBJECT


## Obtener el ID del process
process.pid <- nos brinda el ID del proceso 


## LOS ARGUMENTOS por COMANDO - SCRIPT
process.argv <- nos brinda las palabras que escribimos de comando ["dir", "path"]

Aprendimos a utilizar la librería 'commander'

## Manejo de VARIABLES OCULTAS (de entorno)
process.env

## OBSERVAR si el SERVER se levanta o cierra correctamente
process.on("SIGINT",()=>{})

## ATRAPAR ERRORES y que no se caiga el SERVER
process.on("uncaughtException",()=>{})


## CREAR PROCESOS HIJO
Creamos el proceso HIJO
process.on("message", (msg) => {})

y lo FORKEAMOS al proceso principal
const { fork, exec, execFile } = require("child_process"); // Nativo de Node

child.on("message", (msg) => {
    // { type: "resultado", result: Math.round(result) }
    if (msg.type === "resultado") {
      res.status(200).send(`Resultado del cálculo: ${msg.result}`);
    }
  });