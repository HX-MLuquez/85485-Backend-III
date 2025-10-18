import { Router } from "express";
export const router = Router();
import crypto from "crypto";

//
// Simulated product catalog (could be replaced by DB in the future)
// ------------------------------------------------------------------
const productsCatalog = [
  { id: 1, name: "Concrete", price: 120 },
  { id: 2, name: "Rebar", price: 250 },
  { id: 3, name: "Gravel", price: 90 },
  { id: 4, name: "Plywood", price: 160 },
  { id: 5, name: "Insulation Foam", price: 320 },
];

//
// Route: GET /products/filter
// -------------------------------------------------------------------
// Description: Returns products filtered by name and/or maximum price
//* Route de dificultad simple que no requiere de una gran carga de procesamiento
router.get("/products/filter", (req, res) => {
  const { name, maxPrice } = req.query;

  // Basic input validation
  const priceLimit = maxPrice ? parseFloat(maxPrice) : null;
  if (maxPrice && isNaN(priceLimit)) {
    return res.status(400).json({ error: "maxPrice must be a valid number" });
  }

  const results = productsCatalog.filter((product) => {
    const matchesName = name
      ? product.name.toLowerCase().includes(name.toLowerCase())
      : true;
    const matchesPrice =
      priceLimit !== null ? product.price <= priceLimit : true;
    return matchesName && matchesPrice;
  });
  const date = new Date();
  const formattedDate = date.toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  return res.status(200).json({ count: results.length, products: results, date: formattedDate });
});

//
// Route: GET /engineering/brute-hash
// -------------------------------------------------------------------
router.get("/engineering/brute-hash", (req, res) => {
  console.time("Hash brute force");

  const targetHash = crypto.createHash("sha256").update("abc123").digest("hex");
  let found = false;
  let attempt = 0;
  let result = "";

  while (!found) {
    const guess = `guess${attempt}`;
    const hash = crypto.createHash("sha256").update(guess).digest("hex");

    if (hash === targetHash) {
      found = true;
      result = guess;
    }

    attempt++;

    // Por seguridad, detener si pasa de muchos intentos
    if (attempt > 2_000_000) break;
  }

  console.timeEnd("Hash brute force");
  const date = new Date();
  const formattedDate = date.toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  return res.status(200).json({
    found,
    result,
    attempts: attempt,
    date: formattedDate,
  });
});

/*
* ROUTE `/engineering/brute-hash`

Un **hash** es una función que transforma una entrada (por ejemplo, un string como `"abc123"`) 
en una salida de longitud fija (por ejemplo, un string hexadecimal de 64 caracteres con SHA-256).

**Propiedad importante**: no se puede "deshacer" un hash fácilmente. 
La única forma de encontrar una entrada que produce un hash específico es 
**probando muchas entradas diferentes** hasta encontrar la correcta, eso es lo que hace 
un ataque de fuerza bruta.

---

* Análisis del code

Ruta `GET /engineering/brute-hash`

```js
console.time("Hash brute force");
```
Comienza una medición de tiempo para saber cuánto tarda la operación completa.

* Paso 1: Se genera el hash que queremos "romper"

```js
const targetHash = crypto.createHash('sha256').update("abc123").digest('hex');
```

* Se genera el **hash SHA-256 de la cadena `"abc123"`**
* El resultado será algo como:

  ```
  6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090
  ```

El **objetivo**: encontrar con fuerza bruta una cadena que genere **ese mismo hash**.

---
* Paso 2: Fuerza bruta

```js
let found = false;
let attempt = 0;
let result = '';

while (!found) {
  const guess = `guess${attempt}`;
  const hash = crypto.createHash('sha256').update(guess).digest('hex');

  if (hash === targetHash) {
    found = true;
    result = guess;
  }

  attempt++;

  if (attempt > 1_000_000) break; // límite de seguridad
}
```

Aquí está la carga real:

* En cada iteración genera una cadena: `"guess0"`, `"guess1"`, `"guess2"`, etc.
* Calcula el **hash SHA-256** de cada cadena.
* Compara si ese hash coincide con el hash objetivo (`targetHash`).
* Repite hasta que lo encuentre o llegue a 1.000.000 intentos (para evitar ciclos infinitos).

**Esto realmente gasta CPU**: cada hash es costoso, y se generan potencialmente **millones** 
en un solo request.

---

### Finaliza y responde

```js
console.timeEnd("Hash brute force");
```

Mide cuánto tiempo total tardó la operación.

```js
return res.status(200).json({
  found,
  result,
  attempts: attempt,
});
```

Devuelve al cliente un JSON con:

* Si lo encontró o no (`found`)
* El input que generó ese hash (`result`)
* Cuántos intentos necesitó (`attempts`)

---

## ¿Por qué esto es carga **real** y no artificial?

* Cada intento implica **un cálculo SHA-256**, que es criptográficamente complejo.
* No sabemos cuántos intentos llevará (depende del valor buscado).
* El CPU realmente está trabajando: **no hay sleep, no hay I/O**, solo cálculos intensivos.
* Esto puede colapsar un solo thread si se ejecuta muchas veces, lo que lo hace ideal para 
  pruebas de rendimiento, benchmarking o experimentos con `cluster` o `worker_threads`.

*/