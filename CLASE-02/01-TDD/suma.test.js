import { suma } from "./utils/suma.js";
import chalk from "chalk";

function describe(nombreSuite, callback) {
  let total = 0;
  let exitos = 0;

  console.log(chalk.blueBright(`\n🧪 Test Suite: ${nombreSuite}`));
  console.time("⏱ Duración");

  const it = (descripcion, fn) => {
    // IT -> TEST
    total++;
    try {
      fn();
      exitos++;
      console.log(`${chalk.green("✓")} ${descripcion}`);
    } catch (error) {
      console.log(`${chalk.red("✗")} ${descripcion}`);
      console.log(chalk.red(`   → ${error.message}`));
    }
  };
  callback(it);
  console.timeEnd("⏱ Duración");
  console.log(
    chalk.bold(`\nResumen:`),
    chalk.green(`${exitos} exitosas`),
    "|",
    chalk.red(`${total - exitos} fallidas`)
  );
}

//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝

//* describe(...)

describe("Pruebas para la función suma()", (it) => {
  it("debe retornar 7 en base a la suma de los números 4 y 3", () => {
    //* Esta es la fn que le pasamos por callback a la function real it
    const resultado = suma(4, 3);
    const esperado = 7;
    if (resultado !== esperado)
      throw new Error(`Esperado ${esperado}, pero se obtuvo ${resultado}`);
  });
  it("debe retornar 'error' si algún argumento no es un número", () => {
    const resultado = suma(4, "juan");
    const esperado = "error";
    if (resultado !== esperado)
      throw new Error(`Esperado '${esperado}', pero se obtuvo '${resultado}'`);
  });
  it("debe retornar la suma de múltiples números", () => {
    const resultado = suma(1, 2, 3, 4, 5);
    const esperado = 15;
    if (resultado !== esperado)
      throw new Error(`Esperado ${esperado}, pero se obtuvo ${resultado}`);
  });
});

//-------------------------------------------------------------

/*
JEST 

jest.describe (---serie de test---)
jest.it(---es un test TDD en sí---)

*/
