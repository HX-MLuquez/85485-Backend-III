/*
console.log("--- in example TEST ---");

//* TEST UNITARIO

//* ANTES (solo 1 vez para todo el describe)
before(async () => {});

//* DESPUÉS (solo 1 vez para todo el describe)
after(() => {});

//* describe es Método que encierra una serie de test que apuntan a una misma tarea (function)
describe("Una descripción: Test sobre la función generateUsers (con mock)", function () {
  //* Tiempo de espera máximo (de 2 seg)
  // this.timeout(5000); //* Va a tener una tolerancia de hasta 5 seg por it (por test)

  //* ANTES (solo 1 vez para cada IT (it()))
  beforeEach(() => {});
  //* DESPUÉS (solo 1 vez para cada IT (it()))
  afterEach(() => {});

  //* it es un TEST en sí
  it("Test 1: generateUsers recibe .... ..... y debe retornar ..... .....", () => {});
  it("Test 2: generateUsers recibe .... ..... y debe retornar ..... .....", () => {});
  //* De ser async
  it("Test 3: generateUsers recibe .... ..... y debe retornar ..... .....", async () => {});
});


*/