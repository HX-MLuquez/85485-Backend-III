# TDD - Testing Unitario

Cuando pensamos en testing, pensamos en algo que nos de garantías de que la aplicación que estamos construyendo funcione bien. Además de que funcionen bien en nuestra compu, nos vamos a asegurar que cuando lo deployemos (veremos esto más adelante), también funcionen en el destino o que si fallan algunos tests directamente no lleguen las nuevas actualizaciones al servidor de producción.

## Unit Testing

Un test unitario o _unit test_ es un pedazo de código automático que invoca a una **unidad de trabajo** del sistema y chequea que el resultado de esa unidad sea el esperado.
Una **unidad de trabajo** es cualquier función lógica del sistema que no pueda ser separada en piezas más pequeñas y que puede ser invocada por alguna otra interfaz. Esta unidad puede ser sólo un método, o el comportamiento de una clase entera, o el comportamiento de varias clases interactuando entre ellas para lograr un próposito, que puede ser verificado.

La presencia de _tests unitarios_ habla de que el software fue construido (de alguna manera) de forma _modular_. Cuando escuches que alguien dice que \_el software debería ser más **testeable\_** se refiere a esto.

Un buen test unitario debería ser:

- Completamente automatizable
- Poder ejecutarse en cualquier orden en conjunto con otroso tests.
- **Siempre** retorna el mismo resultado, no importa cuantas veces lo corra.
- Es rápido
- Testea un solo concepto lógico del sistema
- Es fácil de entender al leerlo
- Es fácil de mantener




## Integration Test

Estos tests prueban el funcionamiento de distintas unidades combinadas, por ejemplo la interacción entre un módulo y sus dependencias.

## End to End Tests

Estos tests sirven para probar la aplicación en su totalidad, es decir, usarla como si fueras el usuario final y probar si todo está funcionando bien. Por ejemplo, si estuvieramos trabajando en un eCommerce, probariamos si podemos loaguearnos, buscar un producto, agregarlo al carrito, y comprarlo!

## Test Driven Development

Test Driven Development (TDD) es una técnica para construir software que se basa en escribir tests. Básicamente consiste en el siguiente ciclo:

- **Agregá un test nuevo**: En TDD, para cada nueva feature vas a escribir un nuevo test, para hacerlo el desarrollador está obligado a conocer en detalle las especificaciones y requerimientos de esa feature. Esto es clave y es el gran diferenciador entre escribir el _test_ **después** que hayas escrito el código, de esta forma tenés todo definido antes de empezar por la primera línea de código.
- **Corré todos los test y fijate si el nuevo falla**: Si ya teniamos otros tests, antes de empezar a codear nos fijamos si realmente el nuevo test NO pasa. En caso contrario estariamos implementando funcionalidad que ya está definida o funcionalidad que no sirve, o tal vez el test esté mal escrito.
- **Escribí el código**: Ahora sí, empezamos a escribir código de tal manera que logremos que el test pase. En esta etapa no importa la elegancia del código, sólo queremos pasar el test!
- **Corré los tests**: Si todos los test corren, incluido el nuevo, el desarrollador está seguro que el nuevo código cumple con los requerimientos de la funcionalidad y además que los nuevos cambios no rompen ninguna otra feature ya existente. Si no pasan, hay que volver al punto 4!
- **Refactoreá el código**: Una vez que hayamos pasado el test, vamos a refactorear el código para que sean lo más legibles y performantes posibles, y que mantengan la convención de nombres y patrones que todo el proyecto.
- **Repetí**: Ahora pasamos a un nuevo test, es decir vamos a agregar un nuevo feature o funcionalidad y vamos a empezar desde el primer paso!


## Testing Frameworks

Existen muchas herramientas que nos van a ayudar a automatizar la creación, ejecución y control de los tests unitarios. De hecho, exiten herramientas que sirven como 'ambientes' de prueba, y con ellas vamos a poder armar el workflow de tests (agrupar tests, ejecutar los tests automáticamente antes de hacer un deployment, etc..) y tambien existen librerías de _Aserción_ (assertion), que nos van a servir para comprobar si el output esperado de una función condice con el output real.

> En programación una _aserción_ o _assertion_ es un predicado (expresión que devuelve verdadero o falso), incluido en un programa y que generalmente compara el resultado o el estado esperado de algo contra el real en el momento de ejecución.



# BDD - Behavior Driven Development - Testing de integración

Behavior Driven Development (BDD) es una técnica de desarrollo de software que se centra en el comportamiento del sistema desde la perspectiva del usuario. A diferencia de TDD, que se enfoca en las pruebas unitarias, BDD busca definir el comportamiento esperado del sistema a través de ejemplos concretos y legibles por humanos. Es decir que BDD testea la integración de diferentes componentes del sistema y cómo interactúan entre sí para cumplir con los requisitos del usuario. Un BDD puede ser visto como una extensión de TDD, ya que también implica escribir pruebas antes de implementar el código, pero con un enfoque más centrado en el comportamiento del sistema.

## Principios de BDD

Los principios fundamentales de BDD incluyen:

- **Colaboración**: Fomenta la colaboración entre desarrolladores, testers y otros interesados en el proyecto, como analistas de negocio y clientes.
- **Lenguaje Ubicuo**: Utiliza un lenguaje común y comprensible para todos los involucrados en el proyecto, lo que facilita la comunicación y evita malentendidos.
- **Enfoque en el Comportamiento**: Se centra en el comportamiento del sistema desde la perspectiva del usuario, definiendo cómo debería funcionar el sistema en diferentes escenarios.
- **Especificaciones Ejecutables**: Las pruebas se escriben como especificaciones ejecutables que describen el comportamiento esperado del sistema en diferentes situaciones.
- **Iteración y Evolución**: Permite iterar y evolucionar el sistema a medida que se descubren nuevos requisitos o se realizan cambios en el comportamiento esperado.
- **Pruebas Automatizadas**: Las pruebas se automatizan para garantizar que el sistema se comporte como se espera en diferentes escenarios y para facilitar la detección temprana de errores.
- **Documentación Viva**: Las pruebas actúan como documentación viva del sistema, describiendo cómo debería comportarse en diferentes situaciones y proporcionando ejemplos concretos de uso.

## Cómo funciona BDD

En BDD, las pruebas se escriben antes de implementar el código, siguiendo el ciclo de desarrollo conocido como "Red-Green-Refactor". Este ciclo implica:

1. **Red**: Escribir una prueba que falle, ya que la funcionalidad aún no está implementada.
2. **Green**: Implementar el código necesario para hacer que la prueba pase, asegurando que el comportamiento esperado se cumpla.
3. **Refactor**: Mejorar el código implementado, manteniendo las pruebas verdes, es decir, asegurándose de que todas las pruebas sigan pasando después de la refactorización.
4. **Iterar**: Repetir el proceso para nuevas funcionalidades o cambios en el comportamiento del sistema.

En BDD, las pruebas se escriben en un formato legible por humanos, utilizando un lenguaje natural que describe el comportamiento esperado del sistema. Esto permite que tanto desarrolladores como no desarrolladores (como analistas de negocio o clientes) puedan entender y colaborar en la definición de los requisitos del sistema.

## Herramientas de BDD

Existen varias herramientas populares para implementar BDD, entre ellas:

- **Cucumber**: Una de las herramientas más conocidas para BDD, que permite escribir pruebas en un lenguaje natural llamado Gherkin. Cucumber se integra con varios lenguajes de programación y frameworks.
- **Jasmine**: Un framework de pruebas para JavaScript que permite escribir pruebas en un estilo BDD. Es ampliamente utilizado en aplicaciones web y móviles.
- **Mocha**: Aunque Mocha es un framework de pruebas más general, se puede utilizar en un estilo BDD con la ayuda de bibliotecas como Chai para las aserciones.
- **RSpec**: Un framework de pruebas para Ruby que sigue el enfoque BDD. Permite escribir pruebas en un estilo legible y expresivo.

## Ejemplo de BDD con Mocha y Chai

Para ilustrar cómo se puede implementar BDD con Mocha y Chai, consideremos un ejemplo simple de una calculadora que suma dos números. Utilizaremos el estilo BDD para escribir nuestras pruebas.

---

# Diferencias entre TDD y BDD

| Aspecto          | TDD (Test Driven Development)                                                                      | BDD (Behavior Driven Development)                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Enfoque          | Enfocado en pruebas unitarias y funcionalidad del código.                                          | Enfocado en el comportamiento del sistema desde la perspectiva del usuario.                                              |
| Lenguaje         | Utiliza un lenguaje técnico y específico del código.                                               | Utiliza un lenguaje natural y legible por humanos.                                                                       |
| Colaboración     | Principalmente entre desarrolladores.                                                              | Fomenta la colaboración entre desarrolladores, testers y otros interesados.                                              |
| Especificaciones | Las pruebas son específicas del código y pueden ser difíciles de entender para no desarrolladores. | Las especificaciones son legibles por humanos y describen el comportamiento esperado del sistema.                        |
| Pruebas          | Se centran en pruebas unitarias y funcionalidad del código.                                        | Se centran en pruebas de comportamiento y escenarios de uso.                                                             |
| Documentación    | Las pruebas pueden servir como documentación, pero no son legibles por no desarrolladores.         | Las pruebas actúan como documentación viva del sistema, describiendo cómo debería comportarse en diferentes situaciones. |

---


npm install --save-dev mocha chai

  "devDependencies": {
    "chai": "^5.2.0",
    "mocha": "^11.5.0"
  }