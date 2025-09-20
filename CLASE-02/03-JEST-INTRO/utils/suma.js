const suma = (...sumandos) => {
  let error = sumandos.some((number) => typeof number != "number");
  if (error) return "error";
  return sumandos.reduce((acum, value) => (acum += value), 0);
};

module.exports = { suma };
