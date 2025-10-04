// Importaciones necesarias - Winston
import winston from "winston";
import { config } from "./config.js";

// Definición de niveles personalizados y colores para los logs
//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝

const nivelesPersonalizados = {
  levels: {
    grave: 0, // -> transport -> File
    warn: 1,
    info: 2,
    leve: 3, // -> transport -> console
  },
  colors: {
    grave: "red",
    warn: "yellow",
    info: "blue",
    leve: "green",
  },
};

// Registrar colores personalizados en Winston
winston.addColors(nivelesPersonalizados.colors);

// Transporte para consola (solo en desarrollo)
const transportConsole = new winston.transports.Console({
  level: "leve", // por console van a poder salir todos - logger.leve .info .warn .grave
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

// Transporte para archivo (solo errores)
const transportFile = new winston.transports.File({
  level: "grave", // solo se van a guardar en archivo los logger.grave
  filename: "./src/logs/error.log",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

//* Crear instancia del -> logger <-
export const logger = winston.createLogger({
  levels: nivelesPersonalizados.levels,
  transports: [transportFile],
});

// Agregar salida por consola solo si estamos en entorno de desarrollo
console.log("Logger initialized, mode:", config.MODE, "- port:", config.PORT);
if (config.MODE === "DEV") {
  logger.add(transportConsole);
}

//* Middleware para inyectar el logger en cada request
export const middLogg = (req, res, next) => {
  req.logger = logger;
  next();
};

/*

req {
params{}
body{}
logger {
  info,
  warn,
  grave{console,file}
  ...
 }
}

*/
