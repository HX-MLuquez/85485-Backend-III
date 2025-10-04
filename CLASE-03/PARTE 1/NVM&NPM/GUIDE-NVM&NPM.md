
# NVM (manejador de versiones de NODE)

Lista de comandos


nvm --version             -v  --version    -d   --dev   
1.1.12

De no tener NVM: 
- con Windows ir a https://github.com/coreybutler/nvm-windows/releases y descargar el .exe
- Linux/Mac:  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

Comando de Ayuda
nvm --help

Vemos la version de node que corre en nuestra máquina
node -v 


Vemos la lista de todas las versiones de node que tenemos instaladas en nuestra máquina
nvm list
  * 20.17.0 (Currently using 64-bit executable)
    16.20.2

nvm list available
Info detallada de las versiones disponibles
|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|    24.0.1    |   22.15.0    |   0.12.18    |   0.11.16    |
|    24.0.0    |   22.14.0    |   0.12.17    |   0.11.15    |
|   23.11.0    |   22.13.1    |   0.12.16    |   0.11.14    |
|   23.10.0    |   22.13.0    |   0.12.15    |   0.11.13    |
|    23.9.0    |   22.12.0    |   0.12.14    |   0.11.12    |
|    23.8.0    |   22.11.0    |   0.12.13    |   0.11.11    |
etc...


Para instalar una nueva versión de node
nvm install 22.15.0
  * 22.15.0
    20.17.0 (Currently using 64-bit executable)
    16.20.2

nvm install 24.4.1

Para movernos de una versión a otra
nvm use 16.20.2
Now using node v16.20.2 (64-bit)


Se les puede asignar un nombre (alias) a cualquier versión ya instalada
nvm alias old_version_security 16.20.2

Ejemplo:
nvm alias old_node 16.20.2

nvm use old_node


Ver la ruta

which node
where node


Uso del recurso nuevo
--watch

node --watch app.js

Este lo incorporamos en el package.json
"scripts": {
    "start": "node --watch app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },




# NPM (manejador de paquetes de NODE)

"dependencies": {
    "express": "^4.17.1"
  }

El operador ^ antes de la versión (^4.17.1) significa lo siguiente:

4 es la versión mayor.
17 es la versión menor.
1 es la versión de parche.
Con ^4.17.1, npm actualizará el paquete express a cualquier versión que sea compatible con 4.x.x, 
es decir, cualquier versión mayor o igual a 4.17.1 pero menor que 5.0.0. Esto incluye versiones como 
4.17.2, 4.18.0, etc., pero no 5.0.0 o versiones mayores.


express 5 --> 6

app.use

app.use_s
app.use_e

app.get

```js
function generatePass(a, b){
    //
    return []
}

2025                    ->      2026
NewPass "new-pass": "^1.0.0"  ->   "^1.0.12"

npm i new-pass

const newPass = require('new-pass')

newPass.generatePass(3, "A")

2027
function generatePassSimple(a){
    //
    return {}
}
"new-pass":  "^1.0.12" ->  "^2.0.12"

2028
function generatePassword(a, b, c){
    //
    return []
}
"new-pass":  "^2.0.12" ->  "^3.0.12"

```

CONFIG

items {
    unit 
    price
    description
}


items {
    unit 
    price
    description_util
}


Ver que dependencias tenemos desactualizadas
npm outdated
Si está todo actualizado posiblemente no muestre nada

Instalamos una version especifica

npm install express@4.21.2

npm install moment@2.22.0
npm install moment@2.30.0

Para desinstalar un paquete
npm uninstall nombre_paquete

npm outdated
Package  Current  Wanted  Latest  Location              Depended by
express   4.21.2  4.21.2   5.1.0  node_modules/express  SERVER-SIMPLE
moment    2.22.0  2.30.1  2.30.1  node_modules/moment   SERVER-SIMPLE


Actualizar una dependencia x

npm update paquete

npm update express