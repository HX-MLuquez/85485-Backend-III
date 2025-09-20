# LIST - OWASP 2021

## 1. Broken Access Control
Descripción general
Desde la quinta posición, el 94 % de las aplicaciones se analizaron para detectar algún tipo de control de acceso deficiente, con una tasa de incidencia promedio del 3,81 %, y presenta la mayor incidencia en el conjunto de datos aportado, con más de 318 000. Entre las Enumeraciones de Debilidades Comunes (CWE) más destacadas se incluyen CWE-200: Exposición de información confidencial a un agente no autorizado , CWE-201: Inserción de información confidencial en los datos enviados y CWE-352: Falsificación de solicitud entre sitios.

Descripción
El control de acceso aplica políticas que impiden a los usuarios actuar fuera de sus permisos. Las fallas suelen provocar la divulgación no autorizada de información, la modificación o la destrucción de todos los datos, o la realización de una función empresarial fuera de los límites del usuario. Las vulnerabilidades comunes del control de acceso incluyen:

Violación del principio de mínimo privilegio o denegación por defecto, donde el acceso solo debe concederse a capacidades, roles o usuarios particulares, pero está disponible para cualquier persona.

Evitar los controles de acceso modificando la URL (manipulación de parámetros o navegación forzada), el estado interno de la aplicación o la página HTML, o utilizando una herramienta de ataque que modifique las solicitudes de API.

Permitir ver o editar la cuenta de otra persona, proporcionando su identificador único (referencias de objetos directos inseguras)

Accediendo a la API con controles de acceso faltantes para POST, PUT y DELETE.

Elevación de privilegios. Actuar como usuario sin iniciar sesión o como administrador con sesión iniciada.

Manipulación de metadatos, como reproducir o alterar un token de control de acceso JSON Web Token (JWT), o una cookie o un campo oculto manipulado para elevar privilegios o abusar de la invalidación de JWT.

La configuración incorrecta de CORS permite el acceso a la API desde orígenes no autorizados o no confiables.

Forzar la navegación a páginas autenticadas como un usuario no autenticado o a páginas privilegiadas como un usuario estándar.

Cómo prevenir
El control de acceso solo es efectivo en códigos confiables del lado del servidor o API sin servidor, donde el atacante no puede modificar la verificación de control de acceso ni los metadatos.

A excepción de los recursos públicos, denegar por defecto.

Implemente mecanismos de control de acceso una sola vez y reutilícelos en toda la aplicación, lo que incluye minimizar el uso de intercambio de recursos de origen cruzado (CORS).

Los controles de acceso al modelo deben imponer la propiedad de los registros en lugar de aceptar que el usuario pueda crear, leer, actualizar o eliminar cualquier registro.

Los modelos de dominio deben imponer requisitos de límites de negocio de aplicaciones únicas.

Deshabilite la lista de directorios del servidor web y asegúrese de que los metadatos de los archivos (por ejemplo, .git) y los archivos de respaldo no estén presentes en las raíces web.

Registrar fallas de control de acceso, alertar a los administradores cuando sea apropiado (por ejemplo, fallas repetidas).

Limite la velocidad de acceso a la API y al controlador para minimizar el daño de las herramientas de ataque automatizadas.

Los identificadores de sesión con estado deben invalidarse en el servidor tras cerrar la sesión. Los tokens JWT sin estado deben ser de corta duración para minimizar la ventana de oportunidad para un atacante. Para JWT de larga duración, se recomienda encarecidamente seguir los estándares de OAuth para revocar el acceso.

Ejemplos de escenarios de ataque
Escenario n.° 1: La aplicación utiliza datos no verificados en una llamada SQL que accede a la información de la cuenta:

 pstmt.setString(1, request.getParameter("acct"));
 ResultSet results = pstmt.executeQuery( );
Un atacante simplemente modifica el parámetro "acct" del navegador para enviar el número de cuenta que desee. Si no se verifica correctamente, el atacante puede acceder a la cuenta de cualquier usuario.

 https://example.com/app/accountInfo?acct=notmyacct
Escenario n.° 2: Un atacante simplemente fuerza la navegación a las URL de destino. Se requieren derechos de administrador para acceder a la página de administración.

 https://example.com/app/getappInfo
 https://example.com/app/admin_getappInfo
Si un usuario no autenticado puede acceder a cualquiera de las páginas, se trata de una falla. Si un usuario no administrador puede acceder a la página de administración, se trata de una falla.

- Protección de sesión con middelware - authentication
- Token - JWT
- No se exponga '/admin/12345', /user/988769 <- tenga un control
- Cuidado con el no manejo de roles

## 2. Cryptographic failures

Descripción
Lo primero es determinar las necesidades de protección de los datos en tránsito y en reposo. Por ejemplo, las contraseñas, los números de tarjetas de crédito, los historiales médicos, la información personal y los secretos comerciales requieren protección adicional, especialmente si dichos datos están sujetos a leyes de privacidad, como el Reglamento General de Protección de Datos (RGPD) de la UE, o a regulaciones, como la protección de datos financieros, como el Estándar de Seguridad de Datos PCI (PCI DSS). Para todos estos datos:

¿Se transmiten datos en texto plano? Esto afecta a protocolos como HTTP, SMTP y FTP, que también utilizan actualizaciones TLS como STARTTLS. El tráfico externo de internet es peligroso. Verifique todo el tráfico interno, por ejemplo, entre balanceadores de carga, servidores web o sistemas back-end.

¿Se utilizan algoritmos o protocolos criptográficos antiguos o débiles de forma predeterminada o en códigos más antiguos?

¿Se utilizan claves criptográficas predeterminadas, se generan o reutilizan claves criptográficas débiles, o falta una gestión o rotación de claves adecuada? ¿Se almacenan las claves criptográficas en los repositorios de código fuente?

¿No se aplica el cifrado?, por ejemplo, ¿faltan directivas de seguridad o encabezados en los encabezados HTTP (navegador)?

¿El certificado de servidor recibido y la cadena de confianza están correctamente validados?

¿Se ignoran, reutilizan o no se generan los vectores de inicialización con la seguridad suficiente para el modo criptográfico? ¿Se utiliza un modo inseguro como ECB? ¿Se utiliza cifrado cuando el cifrado autenticado es más adecuado?

¿Se están utilizando las contraseñas como claves criptográficas en ausencia de una función de derivación de claves base de contraseñas?

¿Se utiliza la aleatoriedad con fines criptográficos que no fueron diseñados para cumplir con los requisitos criptográficos? Incluso si se elige la función correcta, ¿debe el desarrollador generarla? Y, de no ser así, ¿ha sobrescrito el desarrollador la potente funcionalidad de generación de semillas integrada con una semilla que carece de suficiente entropía/imprevisibilidad?

¿Se utilizan funciones hash obsoletas como MD5 o SHA1, o se utilizan funciones hash no criptográficas cuando se necesitan funciones hash criptográficas?

¿Se utilizan métodos de relleno criptográfico obsoletos, como PKCS número 1 v1.5?

¿Son explotables los mensajes de error criptográficos o la información del canal lateral, por ejemplo, en forma de ataques de oráculo de relleno?

Consulte ASVS Crypto (V7), Protección de datos (V9) y SSL/TLS (V10)

Cómo prevenir
Haga lo siguiente, como mínimo, y consulte las referencias:

Clasifique los datos procesados, almacenados o transmitidos por una aplicación. Identifique qué datos son sensibles según las leyes de privacidad, los requisitos regulatorios o las necesidades del negocio.

No almacene datos confidenciales innecesariamente. Deséchelos lo antes posible o utilice tokenización o incluso truncamiento conforme a PCI DSS. Los datos que no se conservan no pueden ser robados.

Asegúrese de cifrar todos los datos confidenciales en reposo.

Asegúrese de que existan algoritmos, protocolos y claves estándar sólidos y actualizados; utilice una gestión de claves adecuada.

Cifre todos los datos en tránsito con protocolos seguros como TLS con cifrados de confidencialidad directa (FS), priorización de cifrado por parte del servidor y parámetros seguros. Aplique el cifrado mediante directivas como la Seguridad de Transporte Estricta HTTP (HSTS).

Deshabilite el almacenamiento en caché de las respuestas que contienen datos confidenciales.

Aplicar los controles de seguridad necesarios según la clasificación de los datos.

No utilice protocolos heredados como FTP y SMTP para transportar datos confidenciales.

Almacene contraseñas utilizando funciones hash adaptativas y saladas fuertes con un factor de trabajo (factor de retardo), como Argon2, scrypt, bcrypt o PBKDF2.

Los vectores de inicialización deben seleccionarse de forma adecuada para el modo de operación. En muchos modos, esto implica utilizar un CSPRNG (generador de números pseudoaleatorios criptográficamente seguro). En los modos que requieren un nonce, el vector de inicialización (IV) no necesita un CSPRNG. En ningún caso, el IV debe utilizarse dos veces para una clave fija.

Utilice siempre cifrado autenticado en lugar de solo cifrado.

Las claves deben generarse criptográficamente de forma aleatoria y almacenarse en memoria como matrices de bytes. Si se utiliza una contraseña, esta debe convertirse en una clave mediante una función adecuada de derivación de claves de base de contraseñas.

Asegúrese de que la aleatoriedad criptográfica se utilice cuando corresponda y de que no se haya generado de forma predecible ni con baja entropía. La mayoría de las API modernas no requieren que el desarrollador genere el CSPRNG para obtener seguridad.

Evite las funciones criptográficas y los esquemas de relleno obsoletos, como MD5, SHA1, PKCS número 1 v1.5.

Verificar de forma independiente la efectividad de la configuración y los ajustes.

Ejemplos de escenarios de ataque
Escenario n.° 1 : Una aplicación cifra números de tarjetas de crédito en una base de datos mediante cifrado automático. Sin embargo, estos datos se descifran automáticamente al recuperarse, lo que permite que una vulnerabilidad de inyección SQL recupere los números de tarjetas de crédito en texto plano.

Escenario n.° 2 : Un sitio web no utiliza ni aplica TLS en todas sus páginas o admite un cifrado débil. Un atacante monitorea el tráfico de red (p. ej., en una red inalámbrica insegura), degrada las conexiones de HTTPS a HTTP, intercepta las solicitudes y roba la cookie de sesión del usuario. Posteriormente, el atacante reproduce esta cookie y secuestra la sesión del usuario (autenticado), accediendo o modificando sus datos privados. En lugar de lo anterior, podría alterar todos los datos transmitidos, por ejemplo, el destinatario de una transferencia de dinero.

Escenario n.° 3 : La base de datos de contraseñas utiliza hashes simples o sin sal para almacenar las contraseñas de todos. Una falla en la carga de archivos permite a un atacante recuperar la base de datos de contraseñas. Todos los hashes sin sal pueden exponerse mediante una tabla arcoíris de hashes precalculados. Los hashes generados por funciones hash simples o rápidas pueden ser descifrados por GPU, incluso si están con sal.

- Asegurar que bcrypt -> salt <- nuestro encriptado sea lo suficientemente fuerte para un entorno real
- No guardar una contraseña cual texto plano (ni temporalmente)
- token <- fecha de vencimiento

## 3. Injection

Descripción general
La inyección descendió al tercer puesto. El 94 % de las aplicaciones se sometieron a pruebas para detectar algún tipo de inyección, con una tasa de incidencia máxima del 19 %, una tasa de incidencia promedio del 3 % y 274 000 incidencias. Entre las Enumeraciones de Debilidades Comunes (CWE) más destacadas se encuentran CWE-79: Cross-site Scripting , CWE-89: SQL Injection y CWE-73: External Control of File Name or Path .

Descripción
Una aplicación es vulnerable a ataques cuando:

Los datos proporcionados por el usuario no son validados, filtrados ni desinfectados por la aplicación.

Las consultas dinámicas o llamadas no parametrizadas sin escape consciente del contexto se utilizan directamente en el intérprete.

Los datos hostiles se utilizan dentro de los parámetros de búsqueda de mapeo relacional de objetos (ORM) para extraer registros confidenciales adicionales.

Los datos hostiles se utilizan directamente o se concatenan. El SQL o comando contiene la estructura y los datos maliciosos en consultas dinámicas, comandos o procedimientos almacenados.

Algunas de las inyecciones más comunes son SQL, NoSQL, comandos del sistema operativo, mapeo relacional de objetos (ORM), LDAP y lenguaje de expresión (EL) u biblioteca de navegación de gráficos de objetos (OGNL). El concepto es idéntico en todos los intérpretes. La revisión del código fuente es el mejor método para detectar si las aplicaciones son vulnerables a inyecciones. Se recomienda encarecidamente realizar pruebas automatizadas de todos los parámetros, encabezados, URL, cookies, JSON, SOAP y datos XML. Las organizaciones pueden incluir herramientas de pruebas de seguridad de aplicaciones estáticas (SAST), dinámicas (DAST) e interactivas (IAST) en el flujo de trabajo de CI/CD para identificar las vulnerabilidades de inyección introducidas antes de la implementación en producción.

Cómo prevenir
Para evitar la inyección es necesario mantener los datos separados de los comandos y las consultas:

La opción preferida es usar una API segura que evite el uso del intérprete por completo, proporcione una interfaz parametrizada o migre a herramientas de mapeo relacional de objetos (ORM).
Nota: Incluso parametrizados, los procedimientos almacenados pueden introducir una inyección SQL si PL/SQL o T-SQL concatenan consultas y datos o ejecutan datos hostiles con EXECUTE IMMEDIATE o exec().

Utilice la validación de entrada positiva del lado del servidor. Esto no constituye una defensa completa, ya que muchas aplicaciones requieren caracteres especiales, como áreas de texto o API para aplicaciones móviles.

Para cualquier consulta dinámica residual, escape los caracteres especiales utilizando la sintaxis de escape específica de ese intérprete.
Nota: Las estructuras SQL, como nombres de tablas y columnas, no se pueden escapar, por lo que los nombres de estructura proporcionados por el usuario son peligrosos. Este es un problema común en el software de generación de informes.

Ejemplos de escenarios de ataque
Escenario n.° 1: Una aplicación utiliza datos no confiables en la construcción de la siguiente llamada SQL vulnerable:

String query = "SELECT \* FROM accounts WHERE custID='" + request.getParameter("id") + "'";
Escenario n.° 2: De manera similar, la confianza ciega de una aplicación en los marcos puede generar consultas que aún sean vulnerables (por ejemplo, Hibernate Query Language (HQL)):

 Query HQLQuery = session.createQuery("FROM accounts WHERE custID='" + request.getParameter("id") + "'");
En ambos casos, el atacante modifica el valor del parámetro 'id' en su navegador para enviar: 'UNION SLEEP(10);--. Por ejemplo:

 http://example.com/app/accountView?id=' UNION SELECT SLEEP(10);--
Esto cambia el significado de ambas consultas para devolver todos los registros de la tabla de cuentas. Ataques más peligrosos podrían modificar o eliminar datos o incluso invocar procedimientos almacenados.

- Querie -> SQL o No SQL - ODM || ORM
- ODM - evitar eval, $where (operadores dinámicos)
- req.body, req.query, req.params
- Validar los tipos de datos -> Plantillas

## 4. Insecure Design
Descripción general
Una nueva categoría para 2021 se centra en los riesgos relacionados con fallas de diseño y arquitectura, y exige un mayor uso del modelado de amenazas, patrones de diseño seguro y arquitecturas de referencia. Como comunidad, necesitamos ir más allá del "desplazamiento a la izquierda" en el ámbito de la codificación para precodificar actividades críticas para los principios de Seguridad por Diseño. Entre las Enumeraciones de Debilidades Comunes (CWE) más destacadas se incluyen CWE-209: Generación de un mensaje de error con información confidencial , CWE-256: Almacenamiento de credenciales sin protección , CWE-501: Violación del límite de confianza y CWE-522: Credenciales con protección insuficiente .

Descripción
El diseño inseguro es una categoría amplia que representa diferentes debilidades, expresadas como un diseño de control ineficaz o ausente. Este diseño no es la fuente de las demás 10 categorías de riesgo principales. Existe una diferencia entre el diseño inseguro y la implementación insegura. Distinguimos entre fallas de diseño y defectos de implementación por una razón: tienen diferentes causas y soluciones. Un diseño seguro puede presentar defectos de implementación que generen vulnerabilidades susceptibles de ser explotadas. Un diseño inseguro no se puede solucionar con una implementación perfecta, ya que, por definición, nunca se crearon los controles de seguridad necesarios para defenderse de ataques específicos. Uno de los factores que contribuye al diseño inseguro es la falta de un perfil de riesgos empresariales inherente al software o sistema en desarrollo y, por lo tanto, la imposibilidad de determinar el nivel de seguridad requerido.

Requisitos y gestión de recursos
Recopile y negocie con la empresa los requisitos de negocio para una aplicación, incluyendo los requisitos de protección de confidencialidad, integridad, disponibilidad y autenticidad de todos los activos de datos, así como la lógica de negocio prevista. Considere la exposición de su aplicación y si necesita segregación de usuarios (además del control de acceso). Recopile los requisitos técnicos, incluyendo los de seguridad funcionales y no funcionales. Planifique y negocie el presupuesto que cubra todo el diseño, la construcción, las pruebas y la operación, incluyendo las actividades de seguridad.

Diseño seguro
El diseño seguro es una cultura y metodología que evalúa constantemente las amenazas y garantiza que el código esté diseñado y probado de forma robusta para prevenir métodos de ataque conocidos. El modelado de amenazas debe integrarse en las sesiones de refinamiento (o actividades similares); busque cambios en los flujos de datos, el control de acceso u otros controles de seguridad. Durante el desarrollo de la historia de usuario, determine el flujo y los estados de fallo correctos, y asegúrese de que las partes responsables e impactadas los comprendan y acuerden. Analice las suposiciones y condiciones para los flujos esperados y de fallo, y asegúrese de que sigan siendo precisos y deseables. Determine cómo validar las suposiciones e implementar las condiciones necesarias para un comportamiento adecuado. Asegúrese de que los resultados se documenten en la historia de usuario. Aprenda de los errores y ofrezca incentivos positivos para promover mejoras. El diseño seguro no es un complemento ni una herramienta que se pueda añadir al software.

Ciclo de vida del desarrollo seguro
Un software seguro requiere un ciclo de vida de desarrollo seguro, algún tipo de patrón de diseño seguro, una metodología de ruta pavimentada, una biblioteca de componentes seguros, herramientas y modelado de amenazas. Contacte con sus especialistas en seguridad desde el inicio de un proyecto de software, durante todo el proceso y el mantenimiento del mismo. Considere aprovechar el Modelo de Madurez de Garantía de Software (SAMM) de OWASP para estructurar sus iniciativas de desarrollo de software seguro.

Cómo prevenir
Establecer y utilizar un ciclo de vida de desarrollo seguro con profesionales de AppSec para ayudar a evaluar y diseñar controles relacionados con la seguridad y la privacidad.

Establecer y utilizar una biblioteca de patrones de diseño seguros o componentes de carreteras pavimentadas listos para usar

Utilice el modelado de amenazas para la autenticación crítica, el control de acceso, la lógica empresarial y los flujos de claves.

Integrar lenguaje y controles de seguridad en las historias de usuario

Integre comprobaciones de plausibilidad en cada nivel de su aplicación (desde el frontend hasta el backend)

Redacte pruebas unitarias y de integración para validar que todos los flujos críticos sean resistentes al modelo de amenazas. Recopile casos de uso y casos de uso indebido para cada nivel de su aplicación.

Segregar capas de niveles en las capas del sistema y de la red según las necesidades de exposición y protección

Segregar a los inquilinos de forma sólida mediante diseño en todos los niveles

Limitar el consumo de recursos por usuario o servicio

Ejemplos de escenarios de ataque
Escenario n.° 1: Un flujo de trabajo de recuperación de credenciales podría incluir preguntas y respuestas, lo cual está prohibido por NIST 800-63b, OWASP ASVS y OWASP Top 10. No se puede confiar en las preguntas y respuestas como prueba de identidad, ya que más de una persona puede conocerlas, por lo que están prohibidas. Este tipo de código debería eliminarse y reemplazarse por un diseño más seguro.

Escenario n.° 2: Una cadena de cines ofrece descuentos por reserva de grupo y tiene un máximo de quince asistentes antes de exigir un depósito. Los atacantes podrían modelar este flujo y probar si pueden reservar seiscientas butacas y todos los cines a la vez con unas pocas solicitudes, lo que provocaría una pérdida masiva de ingresos.

Escenario n.° 3: El sitio web de comercio electrónico de una cadena minorista no cuenta con protección contra bots administrados por revendedores que compran tarjetas de video de alta gama para revenderlas en sitios web de subastas. Esto genera una mala publicidad para los fabricantes de tarjetas de video y los propietarios de las cadenas minoristas, además de generar una persistente hostilidad con los aficionados que no pueden obtener estas tarjetas a ningún precio. Un diseño antibots cuidadoso y reglas de lógica de dominio, como las compras realizadas a los pocos segundos de estar disponibles, podrían identificar compras no auténticas y rechazar dichas transacciones.


- Evitar datos incoherentes
- Evitar type text para lo que un password

## 5. Security Misconfiguration
Descripción general
A partir del puesto n.° 6 de la edición anterior, el 90 % de las aplicaciones se analizaron para detectar algún tipo de configuración incorrecta, con una tasa de incidencia promedio del 4,51 % y más de 208 000 casos de una Enumeración de Debilidades Comunes (CWE) en esta categoría de riesgo. Con la creciente adopción de software altamente configurable, no sorprende ver un ascenso en esta categoría. Entre las CWE más destacadas se incluyen la CWE-16 Configuración y la CWE-611 Restricción incorrecta de la referencia a entidades externas XML .

Descripción
La aplicación podría ser vulnerable si:

Falta de un refuerzo de seguridad adecuado en cualquier parte de la pila de aplicaciones o permisos configurados incorrectamente en los servicios en la nube.

Se habilitan o instalan funciones innecesarias (por ejemplo, puertos, servicios, páginas, cuentas o privilegios innecesarios).

Las cuentas predeterminadas y sus contraseñas siguen habilitadas y sin cambios.

El manejo de errores revela seguimientos de pila u otros mensajes de error excesivamente informativos para los usuarios.

En el caso de los sistemas actualizados, las funciones de seguridad más recientes están deshabilitadas o no están configuradas de forma segura.

La configuración de seguridad en los servidores de aplicaciones, los marcos de aplicaciones (por ejemplo, Struts, Spring, ASP.NET), las bibliotecas, las bases de datos, etc., no están establecidas en valores seguros.

El servidor no envía encabezados ni directivas de seguridad, o no están configurados con valores seguros.

El software está desactualizado o es vulnerable (consulte A06:2021-Componentes vulnerables y obsoletos ).

Sin un proceso de configuración de seguridad de aplicaciones concertado y repetible, los sistemas corren un mayor riesgo.

Cómo prevenir
Se deben implementar procesos de instalación seguros, que incluyan:

Un proceso de reforzamiento repetible facilita y agiliza la implementación de otro entorno debidamente bloqueado. Los entornos de desarrollo, control de calidad y producción deben configurarse de forma idéntica, con credenciales diferentes en cada uno. Este proceso debe automatizarse para minimizar el esfuerzo necesario para configurar un nuevo entorno seguro.

Una plataforma minimalista sin funciones, componentes, documentación ni ejemplos innecesarios. Elimine o no instale funciones y frameworks no utilizados.

Una tarea para revisar y actualizar las configuraciones correspondientes a todas las notas de seguridad, actualizaciones y parches como parte del proceso de gestión de parches (consulte A06:2021 - Componentes vulnerables y obsoletos ). Revise los permisos de almacenamiento en la nube (p. ej., permisos de buckets de S3).

Una arquitectura de aplicación segmentada proporciona una separación efectiva y segura entre componentes o inquilinos, con segmentación, contenedorización o grupos de seguridad en la nube (ACL).

Envío de directivas de seguridad a los clientes, por ejemplo, encabezados de seguridad.

Un proceso automatizado para verificar la efectividad de las configuraciones y ajustes en todos los entornos.

Ejemplos de escenarios de ataque
Escenario n.° 1: El servidor de aplicaciones incluye aplicaciones de muestra que no se eliminaron del servidor de producción. Estas aplicaciones presentan vulnerabilidades de seguridad conocidas que los atacantes utilizan para comprometer el servidor. Supongamos que una de estas aplicaciones es la consola de administración y que las cuentas predeterminadas no se han modificado. En ese caso, el atacante inicia sesión con las contraseñas predeterminadas y toma el control.

Escenario n.° 2: El listado de directorios no está deshabilitado en el servidor. Un atacante descubre que puede simplemente listar directorios. Encuentra y descarga las clases Java compiladas, las descompila y aplica ingeniería inversa para ver el código. A continuación, descubre una grave vulnerabilidad de control de acceso en la aplicación.

Escenario n.° 3: La configuración del servidor de aplicaciones permite que se envíen a los usuarios mensajes de error detallados, como seguimientos de pila. Esto podría exponer información confidencial o fallos subyacentes, como versiones de componentes vulnerables.

Escenario n.° 4: Un proveedor de servicios en la nube (CSP) tiene permisos de uso compartido predeterminados disponibles en Internet para otros usuarios del CSP. Esto permite el acceso a datos confidenciales almacenados en la nube.


- Configurar mal Mongo Cloud (ip public)
- Configurar mal las cors
- Configurar mal el socket
- Configurar mal multer
- Configurar mal logger (ejemplo: mostrar info de error en production que no debemos mostrar)

## 6. Vulnerable and outdated components
Descripción general
Ocupó el segundo puesto en la encuesta de la comunidad de los 10 principales, pero también contaba con datos suficientes para entrar en el Top 10. Los componentes vulnerables son un problema conocido que nos cuesta probar y evaluar el riesgo, y es la única categoría que no tiene ninguna vulnerabilidad y exposición común (CVE) asignada a las CWE incluidas, por lo que se utiliza una ponderación predeterminada de 5.0 para exploits/impacto. Las CWE más destacadas incluidas son CWE-1104: Uso de componentes de terceros sin mantenimiento y las dos CWE del Top 10 de 2013 y 2017.

Descripción
Es probable que seas vulnerable:

Si desconoce las versiones de todos los componentes que utiliza (tanto del lado del cliente como del servidor). Esto incluye los componentes que utiliza directamente, así como las dependencias anidadas.

Si el software es vulnerable, no recibe soporte o está desactualizado. Esto incluye el sistema operativo, el servidor web/de aplicaciones, el sistema de gestión de bases de datos (SGBD), las aplicaciones, las API y todos los componentes, los entornos de ejecución y las bibliotecas.

Si no analiza periódicamente las vulnerabilidades y no se suscribe a los boletines de seguridad relacionados con los componentes que utiliza.

Si no se reparan ni actualizan la plataforma, los marcos y las dependencias subyacentes de forma oportuna y teniendo en cuenta los riesgos. Esto suele ocurrir en entornos donde la aplicación de parches es una tarea mensual o trimestral bajo control de cambios, lo que deja a las organizaciones expuestas a días o meses de exposición innecesaria a vulnerabilidades corregidas.

Si los desarrolladores de software no prueban la compatibilidad de las bibliotecas actualizadas, mejoradas o parcheadas.

Si no protege las configuraciones de los componentes (consulte A05:2021-Configuración incorrecta de seguridad ).

Cómo prevenir
Debería existir un proceso de gestión de parches para:

Elimine dependencias no utilizadas, características innecesarias, componentes, archivos y documentación.

Realice un inventario continuo de las versiones de los componentes del lado del cliente y del servidor (p. ej., frameworks, bibliotecas) y sus dependencias mediante herramientas como versiones, OWASP Dependency Check, retire.js, etc. Supervise continuamente fuentes como las Vulnerabilidades y Exposiciones Comunes (CVE) y la Base de Datos Nacional de Vulnerabilidades (NVD) para detectar vulnerabilidades en los componentes. Utilice herramientas de análisis de composición de software para automatizar el proceso. Suscríbase a las alertas por correo electrónico sobre vulnerabilidades de seguridad relacionadas con los componentes que utiliza.

Obtenga componentes únicamente de fuentes oficiales a través de enlaces seguros. Prefiera los paquetes firmados para reducir la posibilidad de incluir un componente modificado y malicioso (consulte A08:2021 - Fallos de integridad de software y datos ).

Monitoree bibliotecas y componentes sin mantenimiento o que no generen parches de seguridad para versiones anteriores. Si no es posible aplicar parches, considere implementar un parche virtual para monitorear, detectar o protegerse contra el problema detectado.

Toda organización debe garantizar un plan continuo para monitorear, clasificar y aplicar actualizaciones o cambios de configuración durante la vida útil de la aplicación o la cartera.

Ejemplos de escenarios de ataque
Escenario n.° 1: Los componentes suelen ejecutarse con los mismos privilegios que la propia aplicación, por lo que cualquier fallo en un componente puede tener consecuencias graves. Dichos fallos pueden ser accidentales (p. ej., un error de codificación) o intencionados (p. ej., una puerta trasera en un componente). Algunos ejemplos de vulnerabilidades explotables de componentes descubiertas son:

CVE-2017-5638, una vulnerabilidad de ejecución remota de código en Struts 2 que permite la ejecución de código arbitrario en el servidor, ha sido señalada como la causa de importantes infracciones.

Si bien la Internet de las cosas (IoT) suele ser difícil o imposible de parchar, la importancia de hacerlo puede ser grande (por ejemplo, los dispositivos biomédicos).

Existen herramientas automatizadas que ayudan a los atacantes a encontrar sistemas sin parches o mal configurados. Por ejemplo, el motor de búsqueda Shodan IoT puede ayudar a encontrar dispositivos que aún sufren la vulnerabilidad Heartbleed, parcheada en abril de 2014.


- Mantener actualizadas las dependencias
  - 'npm outdated'
  - 'npm audit'
- Evitar paquetes sin mantenimiento
- Evitar tener dependencias que no utilicemos

## 7. Identification and authentication failures
Descripción general
Anteriormente conocida como Autenticación Defectuosa , esta categoría descendió del segundo puesto y ahora incluye Enumeraciones de Debilidades Comunes (CWE) relacionadas con errores de identificación. Entre las CWE más destacadas se incluyen CWE-297: Validación Incorrecta de Certificado con Desajuste de Host , CWE-287: Autenticación Incorrecta y CWE-384: Fijación de Sesión .

Descripción
La confirmación de la identidad del usuario, la autenticación y la gestión de sesiones son fundamentales para la protección contra ataques relacionados con la autenticación. Puede haber vulnerabilidades de autenticación si la aplicación:

Permite ataques automatizados como el robo de credenciales, donde el atacante tiene una lista de nombres de usuario y contraseñas válidos.

Permite la fuerza bruta u otros ataques automatizados.

Permite contraseñas predeterminadas, débiles o conocidas, como "Contraseña1" o "admin/admin".

Utiliza procesos de recuperación de credenciales y de contraseñas olvidadas débiles o ineficaces, como "respuestas basadas en conocimiento", que no se pueden hacer seguras.

Utiliza almacenes de datos de contraseñas de texto simple, cifradas o con algoritmos hash débiles (consulte A02:2021-Fallo criptográfico ).

Tiene autenticación multifactor faltante o ineficaz.

Expone el identificador de sesión en la URL.

Reutilizar el identificador de sesión después de iniciar sesión correctamente.

No invalida correctamente los ID de sesión. Las sesiones de usuario o los tokens de autenticación (principalmente los tokens de inicio de sesión único [SSO]) no se invalidan correctamente al cerrar sesión o durante un periodo de inactividad.

Cómo prevenir
Siempre que sea posible, implemente la autenticación multifactor para evitar el relleno automatizado de credenciales, la fuerza bruta y los ataques de reutilización de credenciales robadas.

No envíe ni implemente con credenciales predeterminadas, especialmente para usuarios administradores.

Implemente verificaciones de contraseñas débiles, como probar contraseñas nuevas o modificadas comparándolas con la lista de las 10 000 peores contraseñas.

Alinee las políticas de longitud, complejidad y rotación de contraseñas con las pautas 800-63b del Instituto Nacional de Estándares y Tecnología (NIST) en la sección 5.1.1 para secretos memorizados u otras políticas de contraseñas modernas basadas en evidencia.

Asegúrese de que las rutas de registro, recuperación de credenciales y API estén reforzadas contra ataques de enumeración de cuentas mediante el uso de los mismos mensajes para todos los resultados.

Limite o retrase cada vez más los intentos fallidos de inicio de sesión, pero tenga cuidado de no crear un escenario de denegación de servicio. Registre todos los fallos y alerte a los administradores cuando se detecten robo de credenciales, ataques de fuerza bruta u otros ataques.

Utilice un gestor de sesiones integrado, seguro y del lado del servidor que genere un nuevo ID de sesión aleatorio con alta entropía tras el inicio de sesión. El ID de sesión no debe estar en la URL, debe almacenarse de forma segura y se invalidará tras el cierre de sesión, inactividad y tiempos de espera absolutos.

Ejemplos de escenarios de ataque
Escenario n.° 1: El robo de credenciales, es decir, el uso de listas de contraseñas conocidas, es un ataque común. Supongamos que una aplicación no implementa protección automatizada contra amenazas ni robo de credenciales. En ese caso, la aplicación puede utilizarse como un oráculo de contraseñas para determinar la validez de las credenciales.

Escenario n.° 2: La mayoría de los ataques de autenticación se producen debido al uso continuo de contraseñas como único factor. Consideradas como buenas prácticas, la rotación de contraseñas y los requisitos de complejidad incitan a los usuarios a usar y reutilizar contraseñas débiles. Se recomienda a las organizaciones que cesen estas prácticas, según la norma NIST 800-63, y que utilicen la autenticación multifactor.

Escenario n.° 3: Los tiempos de espera de la sesión de la aplicación no están configurados correctamente. Un usuario usa una computadora pública para acceder a una aplicación. En lugar de seleccionar "Cerrar sesión", simplemente cierra la pestaña del navegador y se retira. Un atacante usa el mismo navegador una hora después, y el usuario sigue autenticado.

- No texto plano en password
- Usar bcrypt para datos sensibles
- Cuidado con el flow de recuperar contraseña
- Implementar JWT

## 8. Software and Data Integrity Failures
Descripción general
Una nueva categoría para 2021 se centra en realizar suposiciones relacionadas con actualizaciones de software, datos críticos y pipelines de CI/CD sin verificar su integridad. Uno de los impactos con mayor ponderación proviene de los datos de Vulnerabilidades y Exposiciones Comunes/Sistema de Puntuación de Vulnerabilidades Comunes (CVE/CVSS). Entre las Enumeraciones de Debilidades Comunes (CWE) más destacadas se encuentran CWE-829: Inclusión de funcionalidad de una esfera de control no confiable , CWE-494: Descarga de código sin verificación de integridad y CWE-502: Deserialización de datos no confiables .

Descripción
Las fallas de integridad de software y datos se relacionan con código e infraestructura que no protegen contra violaciones de integridad. Un ejemplo de esto es cuando una aplicación depende de complementos, bibliotecas o módulos de fuentes, repositorios y redes de entrega de contenido (CDN) no confiables. Una canalización de CI/CD insegura puede generar acceso no autorizado, código malicioso o comprometer el sistema. Por último, muchas aplicaciones ahora incluyen la función de actualización automática, donde las actualizaciones se descargan sin suficiente verificación de integridad y se aplican a la aplicación que antes era confiable. Los atacantes podrían potencialmente cargar sus propias actualizaciones para que se distribuyan y ejecuten en todas las instalaciones. Otro ejemplo es cuando los objetos o datos se codifican o serializan en una estructura que un atacante puede ver y modificar, lo que es vulnerable a la deserialización insegura.

Cómo prevenir
Utilice firmas digitales o mecanismos similares para verificar que el software o los datos provienen de la fuente esperada y no han sido alterados.

Asegúrese de que las bibliotecas y dependencias, como npm o Maven, utilicen repositorios de confianza. Si su perfil de riesgo es mayor, considere alojar un repositorio interno de confianza y verificado.

Asegúrese de que se utilice una herramienta de seguridad de la cadena de suministro de software, como OWASP Dependency Check o OWASP CycloneDX, para verificar que los componentes no contengan vulnerabilidades conocidas.

Asegúrese de que exista un proceso de revisión de cambios de código y configuración para minimizar la posibilidad de que se introduzcan códigos o configuraciones maliciosos en su canal de software.

Asegúrese de que su canalización de CI/CD tenga la segregación, la configuración y el control de acceso adecuados para garantizar la integridad del código que fluye a través de los procesos de compilación e implementación.

Asegúrese de que los datos serializados sin firmar o sin cifrar no se envíen a clientes no confiables sin algún tipo de verificación de integridad o firma digital para detectar la manipulación o reproducción de los datos serializados.

Ejemplos de escenarios de ataque
Escenario n.° 1: Actualización sin firma: Muchos routers domésticos, decodificadores, firmware de dispositivos y otros no verifican las actualizaciones mediante firmware firmado. El firmware sin firmar es un objetivo cada vez mayor para los atacantes y se prevé que empeore. Esto es una gran preocupación, ya que muchas veces no hay otra solución que corregirlo en una versión futura y esperar a que las versiones anteriores queden obsoletas.

Escenario n.° 2: Actualización maliciosa de SolarWinds : Se sabe que los estados-nación atacan los mecanismos de actualización, siendo un ataque reciente notable el de SolarWinds Orion. La empresa que desarrolla el software contaba con procesos seguros de integridad de compilación y actualización. Sin embargo, estos lograron ser vulnerados, y durante varios meses, la empresa distribuyó una actualización maliciosa altamente dirigida a más de 18 000 organizaciones, de las cuales aproximadamente 100 se vieron afectadas. Esta es una de las brechas de seguridad de mayor alcance y mayor importancia de esta naturaleza en la historia.

Escenario n.° 3: Deserialización insegura: Una aplicación React llama a un conjunto de microservicios de Spring Boot. Como programadores funcionales, intentaron garantizar la inmutabilidad de su código. La solución que idearon consiste en serializar el estado del usuario y transferirlo con cada solicitud. Un atacante detecta la firma del objeto Java "rO0" (en base64) y utiliza la herramienta Java Serial Killer para ejecutar código remoto en el servidor de aplicaciones.


- No usar módulos (dependencias) no seguras de terceros
- Evitar integrar dependencias no necesarias

## 9. Logging and monitoring failures
Descripción general
El registro y la monitorización de seguridad provienen de la encuesta comunitaria Top 10 (n.º 3), subiendo ligeramente desde la décima posición en el OWASP Top 10 2017. El registro y la monitorización pueden ser difíciles de probar, a menudo implican entrevistas o preguntar si se detectaron ataques durante una prueba de penetración. No hay muchos datos de CVE/CVSS para esta categoría, pero detectar y responder a las brechas es fundamental. Aun así, puede tener un gran impacto en la rendición de cuentas, la visibilidad, las alertas de incidentes y el análisis forense. Esta categoría se expande más allá de CWE-778 Registro insuficiente para incluir CWE-117 Neutralización de salida incorrecta para registros , CWE-223 Omisión de información relevante para la seguridad y CWE-532 Inserción de información confidencial en el archivo de registro .

Descripción
Volviendo al Top 10 de OWASP 2021, esta categoría ayuda a detectar, escalar y responder a las infracciones activas. Sin registro ni monitoreo, las infracciones no se pueden detectar. Un registro, detección, monitoreo y respuesta activa insuficientes ocurren en cualquier momento:

Los eventos auditables, como inicios de sesión, inicios de sesión fallidos y transacciones de alto valor, no se registran.

Las advertencias y los errores no generan mensajes de registro, estos son inadecuados o poco claros.

Los registros de aplicaciones y API no se monitorean para detectar actividad sospechosa.

Los registros solo se almacenan localmente.

No se han establecido umbrales de alerta adecuados ni se han establecido procesos de escalada de respuesta o estos no son efectivos.

Las pruebas de penetración y los análisis realizados por herramientas de pruebas de seguridad de aplicaciones dinámicas (DAST) (como OWASP ZAP) no activan alertas.

La aplicación no puede detectar, escalar ni alertar sobre ataques activos en tiempo real o casi en tiempo real.

Usted es vulnerable a la fuga de información al hacer que los eventos de registro y alerta sean visibles para un usuario o un atacante (consulte A01:2021-Control de acceso roto ).

Usted es vulnerable a inyecciones o ataques a los sistemas de registro o monitoreo si los datos de registro no están codificados correctamente.

Cómo prevenir
Los desarrolladores deben implementar algunos o todos los siguientes controles, según el riesgo de la aplicación:

Asegúrese de que todos los fallos de inicio de sesión, control de acceso y validación de entrada del lado del servidor puedan registrarse con suficiente contexto de usuario para identificar cuentas sospechosas o maliciosas y conservarse durante el tiempo suficiente para permitir un análisis forense retrasado.

Asegúrese de que los registros se generen en un formato que las soluciones de gestión de registros puedan consumir fácilmente.

Asegúrese de que los datos de registro estén codificados correctamente para evitar inyecciones o ataques a los sistemas de registro o monitoreo.

Asegúrese de que las transacciones de alto valor tengan un registro de auditoría con controles de integridad para evitar la manipulación o eliminación, como tablas de bases de datos de solo anexión o similares.

Los equipos de DevSecOps deben establecer un monitoreo y alerta efectivos para poder detectar y responder rápidamente a las actividades sospechosas.

Establecer o adoptar un plan de respuesta y recuperación ante incidentes, como el Instituto Nacional de Estándares y Tecnología (NIST) 800-61r2 o posterior.

Existen marcos de protección de aplicaciones comerciales y de código abierto, como OWASP ModSecurity Core Rule Set, y software de correlación de registros de código abierto, como Elasticsearch, Logstash, Kibana (ELK), que cuentan con paneles y alertas personalizados.

Ejemplos de escenarios de ataque
Escenario n.° 1: El operador del sitio web de un proveedor de seguros médicos infantiles no pudo detectar una filtración debido a la falta de monitoreo y registro. Un tercero informó al proveedor de seguros médicos que un atacante había accedido y modificado miles de historiales médicos confidenciales de más de 3,5 millones de niños. Una revisión posterior al incidente reveló que los desarrolladores del sitio web no habían abordado vulnerabilidades significativas. Al no existir registro ni monitoreo del sistema, la filtración de datos podría haber estado ocurriendo desde 2013, un período de más de siete años.

Escenario n.° 2: Una importante aerolínea india sufrió una filtración de datos que afectó a más de diez años de datos personales de millones de pasajeros, incluyendo datos de pasaportes y tarjetas de crédito. La filtración se produjo en un proveedor externo de alojamiento en la nube, quien notificó a la aerolínea la filtración después de un tiempo.

Escenario n.° 3: Una importante aerolínea europea sufrió una infracción de la normativa GDPR que debe notificarse. La infracción se debió, según se informa, a vulnerabilidades de seguridad en aplicaciones de pago explotadas por atacantes que obtuvieron más de 400 000 registros de pago de clientes. Como resultado, la aerolínea recibió una multa de 20 millones de libras por parte del regulador de privacidad.


- Implementar sistema de logger
- No logear datos sensibles
- Nunca mostrar el document completo de un user
- Generar alertas en base al monitoreo de datos

## 10. Server Side Request Forgery (SSRF)
Descripción general
Esta categoría se añade a partir de la encuesta comunitaria Top 10 (n.º 1). Los datos muestran una tasa de incidencia relativamente baja, con una cobertura de pruebas superior a la media y unas calificaciones de potencial de exploit e impacto superiores a la media. Dado que es probable que las nuevas entradas consistan en una sola o un pequeño grupo de Enumeraciones de Debilidades Comunes (EDC) para su atención y concientización, se espera que se les preste atención y se puedan integrar en una categoría más amplia en una próxima edición.

Descripción
Las fallas de SSRF ocurren cuando una aplicación web obtiene un recurso remoto sin validar la URL proporcionada por el usuario. Esto permite a un atacante obligar a la aplicación a enviar una solicitud manipulada a un destino inesperado, incluso estando protegida por un firewall, una VPN u otro tipo de lista de control de acceso a la red (ACL).

A medida que las aplicaciones web modernas ofrecen a los usuarios finales funciones prácticas, obtener una URL se ha convertido en algo habitual. Como resultado, la incidencia de SSRF está aumentando. Además, la gravedad de SSRF es cada vez mayor debido a los servicios en la nube y la complejidad de las arquitecturas.

Cómo prevenir
Los desarrolladores pueden prevenir SSRF implementando algunos o todos los siguientes controles de defensa en profundidad:

Desde la capa de red
Segmentar la funcionalidad de acceso a recursos remotos en redes separadas para reducir el impacto de SSRF

Aplique políticas de firewall de "denegación por defecto" o reglas de control de acceso a la red para bloquear todo el tráfico de intranet, excepto el esencial.
Consejos:
~ Establezca una propiedad y un ciclo de vida para las reglas de firewall según las aplicaciones.
~ Registre todos los flujos de red aceptados y bloqueados en los firewalls (consulte A09:2021 - Registro y monitoreo de fallas de seguridad ).

Desde la capa de aplicación:
Desinfecte y valide todos los datos de entrada proporcionados por el cliente

Aplicar el esquema de URL, el puerto y el destino con una lista de permitidos positiva

No envíe respuestas sin procesar a los clientes

Deshabilitar redirecciones HTTP

Tenga en cuenta la consistencia de la URL para evitar ataques como la revinculación de DNS y las condiciones de carrera de “tiempo de verificación, tiempo de uso” (TOCTOU).

No mitigue la SSRF mediante listas de denegación ni expresiones regulares. Los atacantes cuentan con listas de carga útil, herramientas y habilidades para eludir las listas de denegación.

Medidas adicionales a considerar:
No implemente otros servicios relevantes para la seguridad en sistemas front-end (p. ej., OpenID). Controle el tráfico local en estos sistemas (p. ej., localhost).

Para las interfaces con grupos de usuarios dedicados y manejables, utilice cifrado de red (por ejemplo, VPN) en sistemas independientes para considerar necesidades de protección muy altas.

- Validar la URL que quiere hacer una petición a nuestro server
- Restringir a URLs internas o privadas
