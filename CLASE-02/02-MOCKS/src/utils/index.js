import { fakerES as faker } from "@faker-js/faker";
//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝

//* generateProducts()
export function generateProducts() {
  let products = [];
  let cantProduct = faker.number.int({ min: 3, max: 101 });
  for (let index = 0; index < cantProduct; index++) {
    const newProduct = {
      _id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price({ min: 30, max: 2000, dec: 0 }),
      quantity: faker.number.int({ min: 1, max: 20 }),
    };
    products.push(newProduct);
  }
  return products;
}

export function generateClient() {
  let firstName = faker.person.firstName("male");
  let lastName = faker.person.lastName();
  let products = generateProducts();
  let newClient = {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    dni: faker.number.int({ min: 9_000_000, max: 53_000_000 }),
    products,
    cantProducts: products.length,
  };

  return newClient;
}
