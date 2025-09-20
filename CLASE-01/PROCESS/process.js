//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝


// console.log("00 process", process);
console.log("01 cwd", process.cwd());
console.log("02 ID", process.pid);
console.log("03 ID", process.argv);


//* Catch MODE
console.log("03 MODE", process.argv[3]);
let mode = "dev"
mode = process.argv[3] ? process.argv[3] : "dev"
if(mode === "prod"){
  console.log("Vamos a buscar las VAR entorno en .env.prod")
} else {
  console.log("Vamos a buscar las VAR entorno en .env.dev")
}
/*
[
  'C:\\Users\\mauuu\\AppData\\Roaming\\nvm\\v20.17.0\\node.exe',
  'C:\\Users\\mauuu\\OneDrive\\Escritorio\\CODERHOUSE\\[ 85485 BACK-III SAB 11-30 ]\\[ 85485 Back-III CLASE ]\\
CLASE-01\\PROCESS\\process.js',
  'hola',
  'mundo'
]
*/

/*
node index.js --mode dev 
node index.js -m dev 

node index.js --mode prod 
node index.js -m prod 


node utils.js -> esto se interpreta y listo termina -> nace y muere el process {...}

node server.js -> nace el process {...} con el Server levantado, y muere cuando se cáe el server


global {...data, métodos}

process {...data, métodos, eventos}
vive en Server 

express - frameWork (Entorno de trabajo) - módulo externo - dependencia
const app = express()
app {...data, métodos} <<< potencial server -> app.listen <<< ya es un Server


---


node process.js
00 process process {
  version: 'v20.17.0',
  versions: {
    node: '20.17.0',
    acorn: '8.11.3',
    ada: '2.9.0',
    ares: '1.32.3',
    base64: '0.5.2',
    brotli: '1.1.0',
    cjs_module_lexer: '1.2.2',
    cldr: '45.0',
    icu: '75.1',
    llhttp: '8.1.2',
    modules: '115',
    napi: '9',
    nghttp2: '1.61.0',
    nghttp3: '0.7.0',
    ngtcp2: '1.1.0',
    openssl: '3.0.13+quic',
    simdutf: '5.3.0',
    tz: '2024a',
    undici: '6.19.2',
    unicode: '15.1',
    uv: '1.46.0',
    uvwasi: '0.0.21',
    v8: '11.3.244.8-node.23',
    zlib: '1.3.0.1-motley-209717d'
  },
  arch: 'x64',
  platform: 'win32',
  release: {
    name: 'node',
    lts: 'Iron',
    sourceUrl: 'https://nodejs.org/download/release/v20.17.0/node-v20.17.0.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v20.17.0/node-v20.17.0-headers.tar.gz',      
    libUrl: 'https://nodejs.org/download/release/v20.17.0/win-x64/node.lib'
  },
  ETC ... ... ...
*/

