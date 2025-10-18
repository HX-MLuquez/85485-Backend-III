// index.js

/*
* LOCAL
* POST http://localhost:3000/api/sessions/registro
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }

* POST http://localhost:3000/api/sessions/login
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }

------------------------------------------------------------------
* DOCKERIZADO
* Para las pruebas con los contenedores de la APP y de MONGODB en docker
debo usar 8080 que es el puerto donde exponemos la APP -> 
 ports:
      - "8080:3000" en el docker-compose.yml 
o cuando corremos -> docker run -d -p 8080:3000 --name nombre-contenedor nombre-imagen
* POST http://localhost:8080/api/sessions/registro
Body: { "nombre": "Juan", "apellido": "Pérez", "email": "juan.perez@example.com", "password": "password123" }
Response: { "nuevoUsuario": { ...usuario... } }

* POST http://localhost:8080/api/sessions/login
Body: { "email": "juan.perez@example.com", "password": "password123" }
Response: { "status": "Login correcto...!!!", "payload": { ...usuario... } }


----------------------------------------------------------------
* MongoDB COMPASS
Para conectar a la db del contenedor posiblemente debemos:
* > net stop MongoDB
Detener el servicio de MongoDB, cerrar Compass y volver a abrirlo
y volver a conectar con mongodb://localhost:27017/ 
Es el mismo puerto que usamos para conectarnos cuando levantamos localmente 
O de no estar detenido lo iniciamos con el comando
* > net start MongoDB
*/