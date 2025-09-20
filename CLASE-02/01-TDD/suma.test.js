import { suma } from "./utils/suma.js";
import chalk from "chalk";

function describe(nombreSuite, callback) {
  let total = 0;
  let exitos = 0;

  console.log(chalk.blueBright(`\n🧪 Test Suite: ${nombreSuite}`));
  console.time("⏱ Duración");

  const it = (descripcion, fn) => {
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





//-------------------------------------------------------------

/*
JEST 

jest.describe (---serie de test---)
jest.it(---es un test TDD en sí---)

*/
