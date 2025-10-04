# Detalle de resultados de **Artillery**

---

### 📌 **Resumen del escenario configurado**

* **Target:** `http://localhost:3000`
* **Duración:** 20 segundos
* **arrivalRate:** 5 usuarios virtuales por segundo
* **Total esperado de usuarios:** `5 usuarios/s × 20 s = 100 usuarios virtuales`
* Cada usuario sigue el siguiente flujo:

  1. `GET /generate-data-user`
  2. `POST /api/sessions/registro`
  3. `POST /api/sessions/login`
* Total de **requests esperados por usuario:** 3
  ⟶ **100 usuarios x 3 requests = 300 requests esperados**

---

### ✅ **Resultados obtenidos**

* **Usuarios creados:** `100`
* **Usuarios completados correctamente:** `91`
* **Usuarios fallidos:** `9`
* **Total de requests HTTP enviados:** `286`
  (en lugar de los 300 esperados)
* **Códigos 200 (OK):** `277`
* **Errores:**

  * `ECONNREFUSED`: 5 (fallas al conectarse, probablemente el servidor no aceptó la conexión)
  * `ECONNRESET`: 4 (el servidor cerró la conexión abruptamente)

---

### 🔍 **¿Por qué no se enviaron los 300 requests?**

* **Usuarios fallidos:** 9 no completaron el flujo → no ejecutaron las 3 peticiones completas.

  * Si cada usuario ejecuta 3 peticiones, y 9 fallan antes de terminar, eso explica por qué faltan algunas requests:
    `9 usuarios × 3 = 27` posibles peticiones no realizadas.
  * Observaste **286 peticiones**, lo cual se alinea con:

    ```
    91 usuarios × 3 peticiones = 273
    + algunos de los 9 usuarios fallidos que alcanzaron a hacer 1 o 2 requests = 286
    ```

---

### 📊 **Tiempos de respuesta por endpoint**

| Endpoint                 | Media (ms) | P95 (ms) | P99 (ms) |
| ------------------------ | ---------- | -------- | -------- |
| `/generate-data-user`    | 51.4       | 135.7    | 198.4    |
| `/api/sessions/registro` | 309.3      | 518.1    | 658.6    |
| `/api/sessions/login`    | 238.7      | 347.3    | 772.9    |

➡️ **Registro** es el endpoint más costoso en promedio.

---

### ❗️ **Errores clave**

* **`ECONNREFUSED`:** ocurre cuando el cliente no puede conectarse al servidor (por ejemplo, puerto cerrado o proceso no corriendo).
* **`ECONNRESET`:** ocurre cuando el servidor aborta una conexión activa. Esto puede deberse a:

  * Sobrecarga momentánea.
  * Límite de conexiones simultáneas.
  * Falta de manejo adecuado de errores en Express o middleware (como `body-parser` o controladores asincrónicos).

---

### 🛠️ **Recomendaciones**

1. **Revisa la capacidad de tu servidor:**

   * ¿Tu backend tiene un `limit` de concurrencia?
   * ¿Estás usando `cluster` o algún balanceador?

2. **Aumenta el log de errores del servidor** para detectar si hay errores no capturados que causen `ECONNRESET`.

3. **Usa `ulimit -n` y ajusta si es bajo** (número máximo de archivos abiertos/sockets).

4. **Prueba con menor `arrivalRate`** para aislar si el problema ocurre por carga:

   ```yaml
   - duration: 20
     arrivalRate: 2
   ```

5. **Agrega `maxSockets` en Node.js** si usas un `http.Agent` personalizado.

---

### ✅ Conclusión

La configuración de Artillery está funcionando correctamente, pero el servidor empieza a fallar al acercarse al límite de concurrencia que puede manejar. No todos los usuarios completan el flujo debido a errores de conexión. Puedes ajustar la tasa de llegada, revisar logs del backend y mejorar el manejo de carga para estabilizarlo.

