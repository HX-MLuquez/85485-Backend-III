//! ╔══════════════════════════════════════════════════╗
//* ║═════════════════                ═════════════════║
//* ║   >>>   🔵🟢🔵   CODIGO AQUÍ   🔵🟢🔵   <<<   ║
//* ║═════════════════                ═════════════════║
//! ╚══════════════════════════════════════════════════╝
const express = require('express')
const app = express()

//* (... ... ...)

const {PORT, SECRET} = process.env
console.log(PORT, SECRET);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})