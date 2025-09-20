const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server escuchando en puerto http://localhost:${port}`);
})

/*
### 5. 🔁 Reinicio automático del servidor

* Usa un manejador de procesos como [PM2](https://pm2.keymetrics.io/):

  * Monitorea procesos.
  * Reinicia en caso de error.
  * Mantiene tu app "viva".
```bash
  pm2 -v
```  
```bash
  npm install -g pm2
```
```bash
pm2 start app.js --name miServidor
```

```bash
pm2 start app.js --name my-app --watch --max-restarts 10 --restart-delay 5000
```

```bash
pm2 status
pm2 list
pm2 stop miServidor
pm2 delete miServidor
```
*/