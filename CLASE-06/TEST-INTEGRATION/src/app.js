import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = "mongodb://localhost:27017/integration_testing?directConnection=true";

//* Para mantener la validación estricta de consultas
mongoose.set("strictQuery", true);
// strictQuery: true ayuda a evitar errores en las consultas y es más seguro en modo desarrollo

const connection = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);

export const server = app.listen(PORT, () =>
  console.log(`Listening on http://localhost:${PORT}`)
);

//* Para correr los supertests, exportamos la app sin escuchar el puerto
export default app;

