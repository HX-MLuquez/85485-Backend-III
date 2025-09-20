// PROCESS CHILD
//* Proceso hijo que realiza un cálculo complejo

// Function to perform a complex calculation
function calculoComplejo() {
  let result = 0;
  for (let i = 0; i < 500_000_000; i++) {
    result += Math.random() * 10;
  }
  return result;
}

module.exports = { calculoComplejo };

