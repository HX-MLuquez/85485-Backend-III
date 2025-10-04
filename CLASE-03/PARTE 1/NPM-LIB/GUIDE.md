
# NPM como usuario

1. Nos registramos, y guardamos
    - userName
    - password
    - email

2. Actualizar en nuestra máquina nuestro npm

npm install npm@latest -g

3. Verificar si estamos logeado localmente con nuestra cuenta creada

npm whoami
mauricio776101

4. De no estar logeados
npm login 

De tener algún error

npm set registry https://registry.npmjs.org/  <- modifica donde apunta el registro

npm get registry

Y ahora si volver a correr:
npm login 

Pueden necesitar:
- userName
- password
- email

Finalmente vuelven a probar:
npm whoami


---
# LIBRERÍA PROPIA
## Ejemplo de dependencia propia a subir

1. Cree la carpeta
2. npm init -y
3. Crear el o los módulos
4. Agregar el README
4. Extra - Subir a GitHub
4. Extra info extra en package json para npm
5. Publicar - Subir a la plataforma NPM
    - npm publish
    - npm publish --access=public

- El nombre de la librería debe ser único
- Para cada publicación la versión debe cambiar
- Como buena práctica previo lo subimos a GitHub
