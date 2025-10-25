/*
salesOrders -> [{id, created, quantity }]

purchaseOrders -> [{id, receiving, quantity, type: "premium" }]
*/
function allocate(salesOrders, purchaseOrders) {
  if (!Array.isArray(salesOrders) || !Array.isArray(purchaseOrders))
    throw new Error("Invalid data types. Both parameters must be strings");

  const orderedSales = salesOrders.sort(
    (a, b) => new Date(a.created) - new Date(b.created)
  );
  const orderedPurchases = purchaseOrders.sort(
    (a, b) => new Date(a.receiving) - new Date(b.receiving)
  );
  const allocatedOrders = [];
  let totalQuantityInStock = 0;

  while (orderedSales.length > 0 && orderedPurchases.length > 0) {
    let currentPurchase = orderedPurchases.shift(); // -> QUEUE [{1}{2}{3}] .shift <- orderedPurchases [{2}{3}]  currentPurchase {1}
    totalQuantityInStock += currentPurchase.quantity;

    while (totalQuantityInStock >= orderedSales[0].quantity) {
      const salesOrder = orderedSales.shift();
      allocatedOrders.push({
        id: salesOrder.id,
        date: currentPurchase.receiving,
      });
      totalQuantityInStock -= salesOrder.quantity;
      if (orderedSales.length == 0) break;
    }
  }

  return allocatedOrders;
}
const compras = [
  { id: 1, receiving: "2025-05-28", quantity: 2 },
  { id: 2, receiving: "2025-05-29", quantity: 4 },
];
const ventas = [
  { id: 1, created: "2025-05-27", quantity: 1 },
  { id: 2, created: "2025-05-30", quantity: 3 },
];

const result = allocate(ventas, compras); // return -> []
console.log(result); // -> [ { id: 1, date: '2025-05-28' }, { id: 2, date: '2025-05-29' } ]

/*
No hay comentarios que me puedan guiar.

 ✓ No hay ningún otro recurso que me apoye a 
saber cómo funciona o si hay algún punto en el 
que tenga que tener especial cuidado al 
momento de modificar.

 ✓ No hay algún ejemplo de input de salesOrders 
ni purchaseOrders, tendremos que buscarlo 
probando petición desde frontend (en caso de 
que se active desde front) o armar nuestro 
propio mock a partir de la base de datos.

*/
