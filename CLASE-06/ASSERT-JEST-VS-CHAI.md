# Comparativa de Assertions: Jest vs Mocha + Chai

### **Comparativa de Assertions: Jest vs Mocha + Chai**

| Concepto / Caso Común                  | **Jest**                          | **Mocha + Chai (`expect`)**         | **Mocha + `assert` (Node.js)**             |
| -------------------------------------- | --------------------------------- | ----------------------------------- | ------------------------------------------ |
| **Igualdad estricta** (`===`)          | `expect(a).toBe(b)`               | `expect(a).to.equal(b)`             | `assert.strictEqual(a, b)`                 |
| **Igualdad profunda (objetos/arrays)** | `expect(a).toEqual(b)`            | `expect(a).to.deep.equal(b)`        | `assert.deepStrictEqual(a, b)`             |
| **Desigualdad estricta**               | `expect(a).not.toBe(b)`           | `expect(a).to.not.equal(b)`         | `assert.notStrictEqual(a, b)`              |
| **Truthy / Falsy**                     | `expect(a).toBeTruthy()`          | `expect(a).to.be.ok`                | `assert.ok(a)`                             |
|                                        | `expect(a).toBeFalsy()`           | `expect(a).to.not.be.ok`            | `assert.ok(!a)`                            |
| **Tipo de dato**                       | `expect(typeof a).toBe("string")` | `expect(a).to.be.a("string")`       | N/A (revisar manualmente con `typeof`)     |
| **Contiene elemento (array, string)**  | `expect(arr).toContain(el)`       | `expect(arr).to.include(el)`        | N/A (o usar `.includes()` con `assert.ok`) |
| **Lanzar error**                       | `expect(fn).toThrow()`            | `expect(fn).to.throw()`             | `assert.throws(fn)`                        |
| **Ser mayor / menor que**              | `expect(a).toBeGreaterThan(b)`    | `expect(a).to.be.above(b)`          | `assert.ok(a > b)`                         |
|                                        | `expect(a).toBeLessThan(b)`       | `expect(a).to.be.below(b)`          | `assert.ok(a < b)`                         |
| **Longitud de array o string**         | `expect(a.length).toBe(3)`        | `expect(a).to.have.lengthOf(3)`     | `assert.strictEqual(a.length, 3)`          |
| **Objeto tiene propiedad**             | `expect(obj).toHaveProperty('x')` | `expect(obj).to.have.property('x')` | `assert.ok('x' in obj)`                    |
| **Booleanos (true/false)**             | `expect(a).toBe(true)`            | `expect(a).to.be.true`              | `assert.strictEqual(a, true)`              |
| **Instancia de clase**                 | `expect(obj).toBeInstanceOf(Foo)` | `expect(obj).to.be.instanceOf(Foo)` | `assert.ok(obj instanceof Foo)`            |

---

### 📦 Requisitos de instalación:

- **Jest**:

  ```bash
  npm install --save-dev jest
  ```

- **Mocha + Chai**:

  ```bash
  npm install --save-dev mocha chai
  ```

---

### 📝 Recomendación

- Si vienes de **Jest**, te sentirás más cómodo con `chai.expect()`.
- Si prefieres **nativo y simple**, puedes usar `assert` (sin instalar nada, parte de Node.js).
- Para proyectos más grandes, `chai` + `sinon` (mocks) es el combo más potente y flexible en el ecosistema Mocha.

---


### 📚 Recursos
- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de Mocha](https://mochajs.org/)
- [Documentación de Chai](https://www.chaijs.com/)
- [Documentación de Sinon](https://sinonjs.org/)

#### Assertions en Jest y Chai (enlaces útiles):
- [Assertions en Jest](https://jestjs.io/docs/expect)
- [Assertions en Chai](https://www.chaijs.com/api/bdd/)
- [Assertions en Mocha](https://mochajs.org/#assertions)
- [Assertions en Node.js](https://nodejs.org/api/assert.html)