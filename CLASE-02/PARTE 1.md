## Conocer los objetivos de nuestro Proyecto Final

## Repaso Breve

# Unidad 2

Objetivos de la clase:

- Entender y aplicar el concepto de TDD
- Comprender el concepto de Mocks
- Realizar un desarrollo práctico de Mocking.

Guía:

1. TDD. Sobre el desarrollo y los errores. Test Driven Development
2. Mocks. Qué son y cómo se utilizan en el desarrollo de software. Faker.js
3. Rendimiento en producción (pm2)
4. Compresión. Gzip. Brotli
5. Middleware para manejo de errores. CustomError.js. Manejador personalizado de errores.
6. ACTIVIDAD PRÁCTICA: Mocking y manejo de errores
7. Extra: instalar Docker para la próxima clase

## TDD + Mocks

### TDD (Test Driven Development)

- TDD es una metodología de desarrollo de software que se basa en escribir pruebas antes de escribir el código de producción.
- El ciclo de TDD se compone de tres pasos:
  1. Escribir una prueba que falle (Red)
  2. Escribir el código de producción mínimo necesario para hacer que la prueba pase (Green)
  3. Refactorizar el código de producción y las pruebas (Refactor)
- El ciclo se repite hasta que se completa la funcionalidad deseada.

También existe el BDD (Behavior Driven Development) que es una metodología similar a TDD pero se centra en el comportamiento del sistema en lugar de en la implementación. BDD utiliza un lenguaje más natural para describir las pruebas, lo que facilita la comunicación entre desarrolladores y no desarrolladores.

Es decir que BDD es una evolución de TDD, donde se busca que las pruebas sean más legibles y comprensibles para todos los involucrados en el proyecto. BDD se basa en la idea de que el comportamiento del sistema debe ser el foco principal del desarrollo, y no la implementación técnica.

### Etapas típicas en un flujo de desarrollo:

- **dev (desarrollo):** donde los desarrolladores trabajan activamente en nuevas características y correcciones.
- **qa (quality assurance):** también conocida como **staging** o preproducción. Aquí se realizan pruebas más exhaustivas en un entorno que simula la producción lo más fielmente posible. A veces se subdivide en **test** y **staging**, dependiendo del equipo.
- **prod (producción):** es el entorno final donde la aplicación está disponible para los usuarios reales.

**QA** y **staging** muchas veces se usan como sinónimos, aunque en algunas organizaciones se diferencian ligeramente.

## Mocks

- Un mock es un objeto simulado que imita el comportamiento de un objeto real en un entorno controlado. Se utilizan en pruebas unitarias para reemplazar dependencias externas y permitir que las pruebas se centren en la lógica del código que se está probando.

- Los mocks permiten simular el comportamiento de objetos complejos, como bases de datos, servicios web o sistemas de archivos, sin necesidad de interactuar con ellos realmente. Esto hace que las pruebas sean más rápidas y confiables, ya que no dependen de factores externos.

### Faker.js

Implementar mocks con faker.js, es una librería que permite generar datos falsos de manera sencilla y rápida. Faker.js es útil para crear datos de prueba realistas y variados, lo que facilita la creación de pruebas unitarias y funcionales sin necesidad de depender de datos reales. Faker.js se puede utilizar en conjunto con mocks para simular el comportamiento de objetos y generar datos falsos para las pruebas.

---

## Extra- Intro a JEST

- Jest es un framework de pruebas para JavaScript que permite realizar pruebas unitarias, de integración y funcionales. Es ampliamente utilizado en aplicaciones React, pero también se puede utilizar con otros frameworks y bibliotecas de JavaScript.
- Jest proporciona una serie de características útiles para facilitar la escritura y ejecución de pruebas, como:
  - Un entorno de prueba aislado y rápido.
  - Soporte para pruebas asíncronas.
  - Funciones de simulación (mocks) para reemplazar dependencias externas.
  - Cobertura de código para medir la efectividad de las pruebas.
  - Integración con herramientas de desarrollo como Babel y Webpack.
