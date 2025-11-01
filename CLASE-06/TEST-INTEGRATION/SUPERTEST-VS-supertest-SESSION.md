# `supertest` y `supertest-session` 

Se utilizan en pruebas de aplicaciones Node.js, especialmente en combinación con **Express**. Aunque ambas se usan para probar rutas HTTP, tienen diferencias clave relacionadas con el **manejo de sesiones**. 

---

La diferencia entre **usar `supertest(app)` directamente** o usar **`supertest-session`** radica en cómo se manejan las **cookies (sesiones)** entre requests.

---

### En resumen

| Característica                     | `supertest(app)`         | `supertest-session(app)`    |
| ---------------------------------- | ------------------------ | --------------------------- |
| Mantiene sesión automáticamente    | ❌ No                     | ✅ Sí                        |
| Necesita pasar cookies manualmente | ✅ Sí                     | ❌ No                        |
| Más realista para sesiones         | ⚠️ Parcialmente realista | ✅ Más cercano al flujo real |
| Complejidad del test               | 🧠 Mayor                 | 👌 Menor                    |

---

---

### ✅ `supertest`

**Propósito**:
Permite hacer peticiones HTTP a una aplicación Express para probar endpoints.

**Características**:

- Ideal para pruebas unitarias de endpoints individuales.
- No mantiene sesión entre múltiples peticiones (cada request es independiente).
- Fácil de usar para probar respuestas HTTP, estados, headers, etc.


---

### 🔄 `supertest-session`

**Propósito**:
Extiende `supertest` para mantener una **sesión persistente entre múltiples requests**, como lo haría un navegador con cookies.

**Características**:

- Ideal para probar flujos autenticados: login → acceder a recurso protegido.
- Simula el comportamiento de un cliente que mantiene la sesión entre requests.
- Requiere usar cookies y middleware de sesión correctamente configurado (como `express-session`).

---

### ⚖️ Comparación directa

| Característica          | `supertest`                    | `supertest-session`            |
| ----------------------- | ------------------------------ | ------------------------------ |
| Persistencia de sesión  | ❌ No                          | ✅ Sí                          |
| Flujo de login → acceso | ❌ Complicado                  | ✅ Natural y realista          |
| Casos de uso típicos    | Pruebas unitarias de endpoints | Pruebas de flujos autenticados |
| Basado en               | `superagent`                   | `supertest`                    |

---

### ¿Cuándo usar cuál?

- Usa **`supertest`** si solo necesitas probar respuestas básicas o endpoints públicos.
- Usa **`supertest-session`** si necesitas mantener la sesión entre peticiones, como probar login/logout o rutas protegidas.

--- 


### Conclusión

`supertest` es excelente para pruebas de endpoints individuales, mientras que `supertest-session` es ideal para flujos que requieren mantener una sesión, como autenticación y acceso a recursos protegidos. La elección entre ambos depende de las necesidades específicas de tus pruebas.
