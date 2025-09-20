const { suma } = require("../utils/suma.js");

describe("Pruebas a la función suma", () => {
  test("Si envío 2 argumentos numéricos, retorna la suma de ambos", () => {
    expect(suma(4, 3)).toBe(7);
    expect(suma(10, 10)).toBe(20);
    expect(suma(100, 3)).toBe(103);
    expect(suma(-4, -3)).toBe(-7);
  });
  test(`Si envío algún dato no numérico retorna "error"`, () => {
    expect(suma(10, "juan carlos")).toBe("error");
  });
  test("Si mando varios números retorna la suma de todos ellos", () => {
    expect(suma(1, 2, 3, 4, 5)).toBe(15);
  });
});
