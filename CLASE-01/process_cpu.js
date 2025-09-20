// CPU Usage Example

// Vamos a inicializar con un bucle según la cantidad de CPU que tenga el sistema

//! |-------------------|
//! | *** CODE AQUI *** |
//! |-------------------|

const { cpus } = require("os")

const cpuCount = cpus().length;
console.log(`Número de CPUs disponibles: ${cpuCount}`);


for (let i = 0; i < cpuCount; i++) {
  console.log(`Iniciando proceso N° ${i + 1} CPU ${i + 1}`);
}

/*
Número de CPUs disponibles: 8
Iniciando proceso N° 1 CPU 1
Iniciando proceso N° 2 CPU 2
Iniciando proceso N° 3 CPU 3
Iniciando proceso N° 4 CPU 4
Iniciando proceso N° 5 CPU 5
Iniciando proceso N° 6 CPU 6
Iniciando proceso N° 7 CPU 7
Iniciando proceso N° 8 CPU 8
*/