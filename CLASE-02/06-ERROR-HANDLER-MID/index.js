const app = require("./src/app.js");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto http://localhost:${PORT}`);
});
